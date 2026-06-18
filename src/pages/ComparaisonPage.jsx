import { useState } from 'react'
import PresetSelector from '../components/PresetSelector'
import ResultGauges, { ParisAccordBanner } from '../components/ResultGauges'
import ComparatorPanel from '../components/ComparatorPanel'
import { COUNTRY_PRESETS } from '../data/countryPresets'
import { ENERGY_SOURCES } from '../data/energyData'
import {
  calcCO2,
  calcCost,
  calcRenewables,
  calcStability,
} from '../utils/calculations'
import { useTheme } from '../ThemeContext'
import { useStrings } from '../i18n/useStrings'

const FRANCE_PRESET = COUNTRY_PRESETS.find((preset) => preset.id === 'france')

function getIndicators(mix) {
  const renewables = calcRenewables(mix)

  return {
    co2: calcCO2(mix, ENERGY_SOURCES),
    cost: calcCost(mix, ENERGY_SOURCES),
    stability: calcStability(mix, ENERGY_SOURCES),
    renewables,
    lowCarbon: mix.nucleaire + renewables,
  }
}

export default function ComparaisonPage() {
  const theme = useTheme()
  const s = useStrings()
  const [presetIdA, setPresetIdA] = useState(FRANCE_PRESET.id)
  const [presetIdB, setPresetIdB] = useState(null)

  const presetA = COUNTRY_PRESETS.find((preset) => preset.id === presetIdA)
  const presetB = presetIdB ? COUNTRY_PRESETS.find((preset) => preset.id === presetIdB) : null

  const mixA = presetA.mix
  const mixB = presetB ? presetB.mix : null

  const labelA = s.countries[presetA.id] ?? presetA.label
  const labelB = presetB ? (s.countries[presetB.id] ?? presetB.label) : '—'

  const indicatorsA = getIndicators(mixA)
  const indicatorsB = mixB ? getIndicators(mixB) : null

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
      <div className="space-y-4">
        <PresetSelector
          onSelect={(mix) => {
            const preset = COUNTRY_PRESETS.find((countryPreset) => countryPreset.mix === mix)
            if (preset) setPresetIdA(preset.id)
          }}
          activeId={presetIdA}
          disabledId={presetIdB}
          theme={theme}
        />
        <ParisAccordBanner co2={indicatorsA.co2} theme={theme} />
        <ResultGauges
          co2={indicatorsA.co2}
          cost={indicatorsA.cost}
          stability={indicatorsA.stability}
          renewables={indicatorsA.renewables}
          lowCarbon={indicatorsA.lowCarbon}
          theme={theme}
          hideParisBanner
        />
      </div>

      <div className="space-y-4">
        <PresetSelector
          onSelect={(mix) => {
            const preset = COUNTRY_PRESETS.find((countryPreset) => countryPreset.mix === mix)
            if (preset) setPresetIdB(preset.id)
          }}
          activeId={presetIdB}
          disabledId={presetIdA}
          theme={theme}
        />
        {mixB ? (
          <>
            <ParisAccordBanner co2={indicatorsB.co2} theme={theme} />
            <ResultGauges
              co2={indicatorsB.co2}
              cost={indicatorsB.cost}
              stability={indicatorsB.stability}
              renewables={indicatorsB.renewables}
              lowCarbon={indicatorsB.lowCarbon}
              theme={theme}
              hideParisBanner
            />
          </>
        ) : (
          <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-[#1F2937] text-sm text-[#9CA3AF]">
            {s.comparison.placeholder}
          </div>
        )}
      </div>

      {mixB && (
        <div className="lg:col-span-2">
          <ComparatorPanel
            mixA={mixA}
            labelA={labelA}
            mixB={mixB}
            labelB={labelB}
            sources={ENERGY_SOURCES}
            theme={theme}
          />
        </div>
      )}
    </div>
  )
}
