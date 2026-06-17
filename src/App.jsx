// Source donnees : mix de reference ODRE / RTE et coefficients indicatifs.

import { useState } from 'react'
import Header from './components/Header'
import MixSliders from './components/MixSliders'
import ResultGauges from './components/ResultGauges'
import MixPieChart from './components/MixPieChart'
import ReferenceBar from './components/ReferenceBar'
import Footer from './components/Footer'
import { ENERGY_SOURCES, REF_MIX, refMix } from './data/energyData'
import {
  calcCO2,
  calcCost,
  calcRenewables,
  calcStability,
} from './utils/calculations'

export default function App() {
  const [mix, setMix] = useState(REF_MIX)
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('energia-theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  })
  const isLight = theme === 'light'

  const co2 = calcCO2(mix, ENERGY_SOURCES)
  const cost = calcCost(mix, ENERGY_SOURCES)
  const stability = calcStability(mix, ENERGY_SOURCES)
  const renewables = calcRenewables(mix)

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('energia-theme', nextTheme)
      return nextTheme
    })
  }

  return (
    <div
      className={`min-h-screen transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#111827]' : 'bg-[#0A0F1E] text-[#F9FAFB]'
      }`}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
        <MixSliders mix={mix} onChange={setMix} theme={theme} />

        <div className="space-y-8">
          <ResultGauges
            co2={co2}
            cost={cost}
            stability={stability}
            renewables={renewables}
            theme={theme}
          />
          <MixPieChart
            mix={mix}
            sources={ENERGY_SOURCES}
            refData={refMix}
            theme={theme}
          />
        </div>
      </main>

      <Footer theme={theme} />
      <ReferenceBar
        refMix={REF_MIX}
        sources={ENERGY_SOURCES}
        refData={refMix}
        theme={theme}
      />
    </div>
  )
}
