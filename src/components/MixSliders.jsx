// Source donnees : mix de reference et coefficients depuis src/data/energyData.js.

import { ENERGY_SOURCES } from '../data/energyData'

export default function MixSliders({ mix, onChange, theme, presetLabel = null }) {
  const sources = Object.values(ENERGY_SOURCES)
  const isLight = theme === 'light'

  function updateSource(id, value) {
    const newValue = Math.min(100, Math.max(0, Number(value)))
    const remaining = 100 - newValue
    const otherSources = sources.filter((source) => source.id !== id)
    const otherTotal = otherSources.reduce((sum, source) => sum + mix[source.id], 0)

    const adjustedOthers = {}

    if (otherTotal === 0) {
      const baseValue = Math.floor(remaining / otherSources.length)
      const leftover = remaining - baseValue * otherSources.length

      otherSources.forEach((source, index) => {
        adjustedOthers[source.id] = baseValue + (index === 0 ? leftover : 0)
      })
    } else {
      otherSources.forEach((source) => {
        adjustedOthers[source.id] = Math.round((mix[source.id] * remaining) / otherTotal)
      })

      const adjustedTotal = otherSources.reduce((sum, source) => {
        return sum + adjustedOthers[source.id]
      }, 0)
      const difference = remaining - adjustedTotal
      const largestSource = otherSources.reduce((largest, source) => {
        return adjustedOthers[source.id] > adjustedOthers[largest.id] ? source : largest
      }, otherSources[0])

      adjustedOthers[largestSource.id] += difference
    }

    onChange({
      ...mix,
      [id]: newValue,
      ...adjustedOthers,
    })
  }

  return (
    <section
      className={`rounded-xl border p-6 transition-colors ${
        isLight
          ? 'border-[#E2E8F0] bg-white'
          : 'border-[#1F2937] bg-[#111827]'
      }`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2
            className={`font-mono text-lg font-bold ${
              isLight ? 'text-[#111827]' : 'text-[#F9FAFB]'
            }`}
          >
            {presetLabel ? `Mix énergétique de ${presetLabel}` : 'Mix énergétique'}
          </h2>
          <p className={`mt-1 text-sm ${isLight ? 'text-[#475569]' : 'text-[#9CA3AF]'}`}>
            {presetLabel ? 'Mix préconfiguré modifiable.' : "Les autres filières s'ajustent automatiquement."}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {sources.map((source) => (
          <label key={source.id} className="block">
            <div className="mb-2 flex items-center justify-between gap-4">
              <span
                className={`flex min-w-0 items-center gap-2 text-sm ${
                  isLight ? 'text-[#111827]' : 'text-[#F9FAFB]'
                }`}
              >
                <span aria-hidden="true">{source.icon}</span>
                <span className="truncate">{source.label}</span>
              </span>
              <span
                className={`font-mono text-sm font-bold ${
                  isLight ? 'text-[#111827]' : 'text-[#F9FAFB]'
                }`}
              >
                {mix[source.id]}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={mix[source.id]}
              aria-label={`Part ${source.label}`}
              onChange={(event) => updateSource(source.id, event.target.value)}
              className="energy-slider w-full cursor-pointer"
              style={{
                '--slider-color': source.color,
                '--slider-track': isLight ? '#E2E8F0' : '#1F2937',
                '--slider-progress': `${mix[source.id]}%`,
              }}
            />
          </label>
        ))}
      </div>
    </section>
  )
}
