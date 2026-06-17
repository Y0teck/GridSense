// Source donnees : mix de reference ODRE / RTE et coefficients indicatifs.

import { useState } from 'react'
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

export default function SimulateurPage() {
  const [mix, setMix] = useState(REF_MIX)
  const [activePresetId, setActivePresetId] = useState(null)
  const theme = useTheme()

  const co2 = calcCO2(mix, ENERGY_SOURCES)
  const cost = calcCost(mix, ENERGY_SOURCES)
  const stability = calcStability(mix, ENERGY_SOURCES)
  const renewables = calcRenewables(mix)
  const lowCarbon = mix.nucleaire + renewables
  const activePreset = COUNTRY_PRESETS.find((preset) => preset.id === activePresetId)
  const activePresetLabel = activePreset ? activePreset.label : null

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
