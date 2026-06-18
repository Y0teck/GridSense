// Source donnees : mix de reference ODRE / RTE et coefficients indicatifs.

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import html2canvas from 'html2canvas'
import MixSliders from '../components/MixSliders'
import ResultGauges, { ParisAccordBanner } from '../components/ResultGauges'
import MixPieChart from '../components/MixPieChart'
import Footer from '../components/Footer'
import PresetSelector from '../components/PresetSelector'
import { ENERGY_SOURCES, REF_MIX, refMix } from '../data/energyData'
import { COUNTRY_PRESETS } from '../data/countryPresets'
import {
  calcCO2,
  calcCost,
  calcRenewables,
  calcStability,
} from '../utils/calculations'
import { useTheme } from '../ThemeContext'
import { useStrings } from '../i18n/useStrings'

const MIX_KEYS = [
  'nucleaire',
  'eolien',
  'solaire',
  'hydraulique',
  'gaz',
  'charbon',
  'bioenergies',
]

function getMixFromSearchParams(searchParams) {
  if (!MIX_KEYS.every((key) => searchParams.has(key))) return null

  const urlMix = {}

  for (const key of MIX_KEYS) {
    const value = Number(searchParams.get(key))

    if (!Number.isInteger(value) || value < 0 || value > 100) {
      return null
    }

    urlMix[key] = value
  }

  const total = MIX_KEYS.reduce((sum, key) => sum + urlMix[key], 0)

  return total === 100 ? urlMix : null
}

function getPresetIdFromSearchParams(searchParams) {
  const presetId = searchParams.get('preset')
  const preset = COUNTRY_PRESETS.find((countryPreset) => countryPreset.id === presetId)

  return preset ? preset.id : null
}

function getMixSearchParams(mix, activePresetId) {
  const params = MIX_KEYS.reduce((nextParams, key) => {
    nextParams[key] = String(mix[key])
    return nextParams
  }, {})

  if (activePresetId) {
    params.preset = activePresetId
  }

  return params
}

function searchParamsMatchMix(searchParams, mix, activePresetId) {
  const mixMatches = MIX_KEYS.every((key) => searchParams.get(key) === String(mix[key]))
  const presetMatches = activePresetId
    ? searchParams.get('preset') === activePresetId
    : !searchParams.has('preset')

  return mixMatches && presetMatches
}

function ShareBar({ exportRef, isLight }) {
  const [captureState, setCaptureState] = useState('idle')
  const [shareCopied, setShareCopied] = useState(false)
  const s = useStrings()

  const defaultButtonClass = isLight
    ? 'border-[#CBD5E1] text-[#64748B] hover:border-[#22D3EE] hover:text-[#22D3EE]'
    : 'border-[#374151] text-[#9CA3AF] hover:border-[#22D3EE] hover:text-[#22D3EE]'

  function showCaptureSuccess() {
    setCaptureState('success')
    window.setTimeout(() => setCaptureState('idle'), 2000)
  }

  function showShareCopied() {
    setShareCopied(true)
    window.setTimeout(() => setShareCopied(false), 2000)
  }

  async function exportPng() {
    if (!exportRef.current || captureState === 'loading') return

    setCaptureState('loading')

    try {
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: '#0B1120',
        scale: 2,
        useCORS: true,
        logging: false,
      })

      canvas.toBlob((blob) => {
        if (!blob) {
          setCaptureState('idle')
          return
        }

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'energIA-mix.png'
        link.click()
        URL.revokeObjectURL(url)
        showCaptureSuccess()
      }, 'image/png')
    } catch {
      setCaptureState('idle')
    }
  }

  async function shareMix() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'ÉnergIA — Mon mix électrique',
          text: "Découvrez l'impact de ce mix énergétique sur le CO₂, le coût et la stabilité du réseau.",
          url: window.location.href,
        })
        return
      }

      await navigator.clipboard.writeText(window.location.href)
      showShareCopied()
    } catch {
      // User cancellation or clipboard refusal leaves the UI unchanged.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={exportPng}
        disabled={captureState === 'loading'}
        className={`flex items-center gap-1.5 rounded-lg border bg-transparent px-3 py-1.5 text-xs font-semibold transition-colors ${
          captureState === 'success' ? 'border-[#10B981] text-[#10B981]' : defaultButtonClass
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
        {captureState === 'loading'
          ? s.shareBar.capturing
          : captureState === 'success'
            ? s.shareBar.downloaded
            : s.shareBar.export}
      </button>

      <button
        type="button"
        onClick={shareMix}
        className={`flex items-center gap-1.5 rounded-lg border bg-transparent px-3 py-1.5 text-xs font-semibold transition-colors ${
          shareCopied ? 'border-[#10B981] text-[#10B981]' : defaultButtonClass
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.59 13.51 6.83 3.98" />
          <path d="m15.41 6.51-6.82 3.98" />
        </svg>
        {shareCopied ? s.shareBar.copied : s.shareBar.share}
      </button>
    </div>
  )
}

export default function SimulateurPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mix, setMix] = useState(() => getMixFromSearchParams(searchParams) ?? REF_MIX)
  const [activePresetId, setActivePresetId] = useState(() => getPresetIdFromSearchParams(searchParams))
  const exportRef = useRef(null)
  const theme = useTheme()
  const isLight = theme === 'light'
  const s = useStrings()

  const co2 = calcCO2(mix, ENERGY_SOURCES)
  const cost = calcCost(mix, ENERGY_SOURCES)
  const stability = calcStability(mix, ENERGY_SOURCES)
  const renewables = calcRenewables(mix)
  const lowCarbon = mix.nucleaire + renewables
  const activePreset = COUNTRY_PRESETS.find((preset) => preset.id === activePresetId)
  const activePresetLabel = activePreset ? (s.countries[activePreset.id] ?? activePreset.label) : null
  const exportMixLabel = activePresetLabel ? `Mix énergétique de ${activePresetLabel}` : 'Mix personnalisé'

  useEffect(() => {
    if (!searchParamsMatchMix(searchParams, mix, activePresetId)) {
      setSearchParams(getMixSearchParams(mix, activePresetId), { replace: true })
    }
  }, [mix, activePresetId, searchParams, setSearchParams])

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
        <div className="space-y-4">
          <PresetSelector
            onSelect={(selectedMix) => {
              const preset = COUNTRY_PRESETS.find((countryPreset) => countryPreset.mix === selectedMix)
              setMix(selectedMix)
              setActivePresetId(preset ? preset.id : null)
            }}
            activeId={activePresetId}
            disabledId={null}
            theme={theme}
          />
          <MixSliders
            mix={mix}
            onChange={(newMix) => {
              setMix(newMix)
              setActivePresetId(null)
            }}
            presetLabel={activePresetLabel}
            theme={theme}
          />
          <ShareBar exportRef={exportRef} isLight={isLight} />
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <ResultGauges
              co2={co2}
              cost={cost}
              stability={stability}
              renewables={renewables}
              lowCarbon={lowCarbon}
              theme={theme}
            />
          </div>
          <MixPieChart
            mix={mix}
            sources={ENERGY_SOURCES}
            refData={refMix}
            theme={theme}
          />
        </div>
      </div>

      <div
        ref={exportRef}
        className="fixed -left-[9999px] top-0 w-[680px]"
        style={{ backgroundColor: '#0B1120', padding: '24px' }}
      >
        <div className="mb-5 flex items-center justify-between gap-6">
          <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="17" stroke="#00D9FF" strokeWidth="3"/>
            <path d="M27 7C34.5 8.5 40 15.3 40 23.5C40 32.6 32.6 40 23.5 40C15.7 40 9.1 34.6 7.4 27.3" stroke="#38F2B2" strokeWidth="3" strokeLinecap="round"/>
            <path d="M26.8 13L16 25.2H24L21.2 35L32 22.8H24L26.8 13Z" fill="#FFB000"/>
            <text x="52" y="31" fontFamily="Inter, system-ui, sans-serif" fontSize="25" fontWeight="800" letterSpacing="0.5" fill="#00D9FF">ÉnergIA</text>
          </svg>
          <p className="text-right text-sm font-semibold text-[#F9FAFB]">{exportMixLabel}</p>
        </div>

        <div className="mb-5" style={{ width: '640px', height: '380px', marginBottom: '16px' }}>
          <MixPieChart
            mix={mix}
            sources={ENERGY_SOURCES}
            refData={refMix}
            theme="dark"
            exportMode={true}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', padding: '0 8px 16px', marginTop: '-8px' }}>
          {Object.values(ENERGY_SOURCES).map((source) => (
            <div key={source.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: source.color, flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{s.sources[source.id] ?? source.label}</span>
            </div>
          ))}
        </div>

        <ResultGauges
          co2={co2}
          cost={cost}
          stability={stability}
          renewables={renewables}
          lowCarbon={lowCarbon}
          theme="dark"
          exportMode={true}
        />

        <ParisAccordBanner co2={co2} theme="dark" exportMode={true} />
      </div>

      <Footer theme={theme} />
    </>
  )
}
