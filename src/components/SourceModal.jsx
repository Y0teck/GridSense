import { useStrings } from '../i18n/useStrings'

export default function SourceModal({ source, theme, onClose }) {
  const isLight = theme === 'light'
  const s = useStrings()
  const mutedText = isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
  const borderColor = isLight ? 'border-[#E2E8F0]' : 'border-[#1F2937]'
  const bodyText = isLight ? 'text-[#334155]' : 'text-[#D1D5DB]'

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
        aria-labelledby="source-modal-title"
      >
        <header className={`flex items-start justify-between gap-4 border-b pb-4 ${borderColor}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">
              {source.icon}
            </span>
            <h2
              id="source-modal-title"
              className="font-mono text-xl font-bold"
              style={{ color: source.color }}
            >
              {source.label}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fiche filière"
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
              Description
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${bodyText}`}>{source.description}</p>
          </section>

          <section>
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
              {s.sourceModal.keyFigures}
            </h3>
            <dl className={`mt-2 divide-y rounded-lg border ${borderColor}`}>
              {source.keyFigures.map((figure) => (
                <div key={figure.label} className="grid grid-cols-2 gap-3 px-3 py-2 text-sm">
                  <dt className={mutedText}>{figure.label}</dt>
                  <dd className="text-right font-mono font-semibold">{figure.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
              {s.sourceModal.advantages}
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              {source.advantages.map((advantage) => (
                <li key={advantage} className={`flex gap-2 leading-relaxed ${bodyText}`}>
                  <span className="font-bold text-[#10B981]" aria-hidden="true">
                    ✓
                  </span>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>
              {s.sourceModal.limits}
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              {source.limits.map((limit) => (
                <li key={limit} className={`flex gap-2 leading-relaxed ${bodyText}`}>
                  <span className="font-bold text-[#EF4444]" aria-hidden="true">
                    ✗
                  </span>
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  )
}
