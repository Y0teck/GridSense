// Source donnees : mix de reference ODRE / RTE et coefficients indicatifs.

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MixSliders from '../components/MixSliders'
import ResultGauges from '../components/ResultGauges'
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

function getMixSearchParams(mix) {
  return MIX_KEYS.reduce((params, key) => {
    params[key] = String(mix[key])
    return params
  }, {})
}

export default function SimulateurPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mix, setMix] = useState(() => getMixFromSearchParams(searchParams) ?? REF_MIX)
  const [activePresetId, setActivePresetId] = useState(null)
  const [copied, setCopied] = useState(false)
  const theme = useTheme()
  const isLight = theme === 'light'

  const co2 = calcCO2(mix, ENERGY_SOURCES)
  const cost = calcCost(mix, ENERGY_SOURCES)
  const stability = calcStability(mix, ENERGY_SOURCES)
  const renewables = calcRenewables(mix)
  const lowCarbon = mix.nucleaire + renewables
  const activePreset = COUNTRY_PRESETS.find((preset) => preset.id === activePresetId)
  const activePresetLabel = activePreset ? activePreset.label : null

  useEffect(() => {
    const urlAlreadyMatchesMix = MIX_KEYS.every((key) => searchParams.get(key) === String(mix[key]))

    if (!urlAlreadyMatchesMix) {
      setSearchParams(getMixSearchParams(mix), { replace: true })
    }
  }, [mix, searchParams, setSearchParams])

  function copyShareLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    })
  }

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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={copyShareLink}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold transition-colors ${
                copied
                  ? 'border-[#10B981] text-[#10B981]'
                  : isLight
                    ? 'border-[#CBD5E1] text-[#64748B] hover:border-[#22D3EE] hover:text-[#0891B2]'
                    : 'border-[#374151] text-[#9CA3AF] hover:border-[#22D3EE] hover:text-[#22D3EE]'
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
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              {copied ? '✓ Lien copié !' : 'Copier le lien'}
            </button>
          </div>
          <MixSliders
            mix={mix}
            onChange={(newMix) => {
              setMix(newMix)
              setActivePresetId(null)
            }}
            presetLabel={activePresetLabel}
            theme={theme}
          />
        </div>

        <div className="space-y-8">
          <ResultGauges
            co2={co2}
            cost={cost}
            stability={stability}
            renewables={renewables}
            lowCarbon={lowCarbon}
            theme={theme}
          />
          <MixPieChart
            mix={mix}
            sources={ENERGY_SOURCES}
            refData={refMix}
            theme={theme}
          />
        </div>
      </div>

      <Footer theme={theme} />
    </>
  )
}
