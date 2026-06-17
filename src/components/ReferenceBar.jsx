// Source donnees : ODRE / RTE depuis src/data/refMix.json.

export default function ReferenceBar({ refMix, sources, refData, theme }) {
  const isLight = theme === 'light'
  const year = refData.annee ?? '—'

  return (
    <aside
      className={`fixed inset-x-0 bottom-0 z-20 border-t px-6 py-3 transition-colors ${
        isLight
          ? 'border-[#E2E8F0] bg-white'
          : 'border-[#1F2937] bg-[#111827]'
      }`}
    >
      <div className="mx-auto grid max-w-7xl gap-2">
        <div className="flex items-center gap-4">
          <p
            className={`text-xs font-semibold ${
              isLight ? 'text-[#111827]' : 'text-[#F9FAFB]'
            }`}
          >
            🇫🇷 Référence RTE - Bilan électrique {year}
          </p>
        </div>

        <div
          className={`flex h-3 overflow-hidden rounded-full ${
            isLight ? 'bg-[#E2E8F0]' : 'bg-[#1F2937]'
          }`}
          aria-label="Mix de référence RTE"
        >
          {Object.values(sources).map((source) => (
            <div
              key={source.id}
              className="h-full"
              style={{
                width: `${refMix[source.id]}%`,
                backgroundColor: source.color,
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
