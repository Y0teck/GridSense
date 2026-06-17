// Source donnees : mix de reference et coefficients depuis src/data/energyData.js.

import { ENERGY_SOURCES, REF_MIX } from '../data/energyData'

export default function MixSliders({ mix, onChange, theme }) {
  const sources = Object.values(ENERGY_SOURCES)
  const total = sources.reduce((sum, source) => sum + mix[source.id], 0)
  const isLight = theme === 'light'

  function updateSource(id, value) {
    onChange({
      ...mix,
      [id]: Number(value),
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
            Mix énergétique
          </h2>
          <p className={`mt-1 text-sm ${isLight ? 'text-[#475569]' : 'text-[#9CA3AF]'}`}>
            Ajustez chaque filière indépendamment.
          </p>
        </div>

        <button
          type="button"
          title="Réinitialise le mix avec les données réelles du Bilan électrique RTE 2025 (source : ODRÉ)"
          onClick={() => onChange(REF_MIX)}
          className={`shrink-0 rounded border px-3 py-2 text-xs font-semibold transition ${
            isLight
              ? 'border-[#CBD5E1] text-[#111827] hover:border-[#22D3EE] hover:text-[#0891B2]'
              : 'border-[#1F2937] text-[#F9FAFB] hover:border-[#22D3EE] hover:text-[#22D3EE]'
          }`}
        >
          Reset RTE
        </button>
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

      <div
        className={`mt-6 h-2 overflow-hidden rounded-full ${
          total === 100 ? 'bg-[#10B981]' : 'bg-[#EF4444]'
        }`}
        aria-hidden="true"
      />

      <p
        className={`mt-3 font-mono text-sm font-bold ${
          total === 100 ? 'text-[#10B981]' : 'text-[#EF4444]'
        }`}
        role="status"
      >
        Total : {total}%
      </p>
    </section>
  )
}
