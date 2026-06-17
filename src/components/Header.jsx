// Source donnees : badge public ODRE / RTE.

export default function Header({ theme, onToggleTheme }) {
  const isLight = theme === 'light'

  return (
    <header className={`relative ${isLight ? 'bg-white' : 'bg-[#0A0F1E]'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <div>
          <h1 className="font-mono text-3xl font-bold text-[#22D3EE]">ÉnergIA</h1>
          <p className={`mt-1 text-sm ${isLight ? 'text-[#475569]' : 'text-[#9CA3AF]'}`}>
            Simulateur de mix électrique français
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}
            className={`grid h-9 w-9 place-items-center rounded border text-base transition ${
              isLight
                ? 'border-[#CBD5E1] bg-[#F8FAFC] text-[#111827] hover:border-[#22D3EE]'
                : 'border-[#22D3EE]/40 bg-[#111827] text-[#F9FAFB] hover:border-[#22D3EE]'
            }`}
          >
            <span aria-hidden="true">{isLight ? '☀️' : '🌙'}</span>
          </button>

          <a
            href="https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/"
            target="_blank"
            rel="noreferrer"
            className={`rounded border px-3 py-2 text-xs font-semibold text-[#22D3EE] transition ${
              isLight
                ? 'border-[#CBD5E1] bg-white hover:border-[#22D3EE] hover:bg-[#ECFEFF]'
                : 'border-[#22D3EE]/40 bg-[#111827] hover:border-[#22D3EE] hover:bg-[#22D3EE]/10'
            }`}
          >
            Données : ODRÉ / RTE
          </a>
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#22D3EE] animate-pulse-line" />
    </header>
  )
}
