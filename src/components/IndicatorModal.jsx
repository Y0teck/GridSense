export default function IndicatorModal({ indicator, theme, onClose }) {
  const isLight = theme === 'light'
  const mutedText = isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
  const borderColor = isLight ? 'border-[#E2E8F0]' : 'border-[#1F2937]'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      onClick={onClose}
      role="presentation"
    >
      <section
        className={`max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl p-6 shadow-2xl ${
          isLight ? 'bg-white text-[#111827]' : 'bg-[#111827] text-white'
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="indicator-modal-title"
      >
        <header className={`flex items-start justify-between gap-4 border-b pb-4 ${borderColor}`}>
          <div>
            <h2 id="indicator-modal-title" className="font-mono text-xl font-bold text-[#22D3EE]">
              {indicator.title}
            </h2>
            <p className={`mt-1 text-sm ${mutedText}`}>{indicator.unit}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fiche indicateur"
            className={`rounded-lg px-2 py-1 text-lg leading-none transition-colors ${
              isLight ? 'text-[#64748B] hover:bg-[#E2E8F0]' : 'text-[#9CA3AF] hover:bg-[#1F2937]'
            }`}
          >
            ✕
          </button>
        </header>

        <div className="mt-5 space-y-6">
          <section>
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
              Définition
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-[#334155]' : 'text-[#D1D5DB]'}`}>
              {indicator.definition}
            </p>
          </section>

          <section>
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
              Calcul
            </h3>
            <pre
              className={`mt-2 overflow-x-auto rounded-lg border p-4 text-xs leading-relaxed ${
                isLight
                  ? 'border-[#E2E8F0] bg-[#F8FAFC] text-[#111827]'
                  : 'border-[#1F2937] bg-[#0B1120] text-[#E5E7EB]'
              }`}
            >
              <code>{indicator.calculation}</code>
            </pre>
          </section>

          <section>
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
              Valeurs de référence
            </h3>
            <dl className={`mt-2 divide-y rounded-lg border ${borderColor}`}>
              {indicator.references.map((reference) => (
                <div
                  key={reference.label}
                  className={`grid grid-cols-2 gap-3 px-3 py-2 text-sm ${
                    isLight ? 'divide-[#E2E8F0]' : 'divide-[#1F2937]'
                  }`}
                >
                  <dt className={mutedText}>{reference.label}</dt>
                  <dd className="text-right font-mono font-semibold">{reference.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {indicator.example ? (
            <section>
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
                Exemple concret
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-[#334155]' : 'text-[#D1D5DB]'}`}>
                {indicator.example}
              </p>
            </section>
          ) : null}

          {indicator.caveat ? (
            <section>
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
                À noter
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-[#334155]' : 'text-[#D1D5DB]'}`}>
                <span aria-hidden="true">▲ </span>
                {indicator.caveat}
              </p>
            </section>
          ) : null}

          <section>
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
              Sources
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              {indicator.sources.map((source) => (
                <li key={source.name}>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#22D3EE] transition-colors hover:text-[#0891B2]"
                    >
                      {source.name}
                    </a>
                  ) : (
                    <span className={isLight ? 'text-[#334155]' : 'text-[#D1D5DB]'}>
                      {source.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  )
}
