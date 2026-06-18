// Source donnees : badge public ODRE / RTE.

import { useContext } from 'react'
import { LanguageContext } from '../LanguageContext'
import { useStrings } from '../i18n/useStrings'

export default function Header({ theme, onToggleTheme }) {
  const isLight = theme === 'light'
  const { lang, setLang } = useContext(LanguageContext)
  const s = useStrings()

  return (
    <header className={`relative ${isLight ? 'bg-white' : 'bg-[#0A0F1E]'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <div>
          <h1 className="leading-none">
            <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ÉnergIA">
              <circle cx="24" cy="24" r="17" stroke="#00D9FF" strokeWidth="3"/>
              <path d="M27 7C34.5 8.5 40 15.3 40 23.5C40 32.6 32.6 40 23.5 40C15.7 40 9.1 34.6 7.4 27.3" stroke="#38F2B2" strokeWidth="3" strokeLinecap="round"/>
              <path d="M26.8 13L16 25.2H24L21.2 35L32 22.8H24L26.8 13Z" fill="#FFB000"/>
              <text x="52" y="31" fontFamily="Inter, system-ui, sans-serif" fontSize="25" fontWeight="800" letterSpacing="0.5" fill="#00D9FF">ÉnergIA</text>
            </svg>
          </h1>
          <p className={`mt-1 text-sm ${isLight ? 'text-[#475569]' : 'text-[#9CA3AF]'}`}>
            {s.header.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            className={`grid h-9 w-9 place-items-center rounded border text-xs font-bold transition ${
              isLight
                ? 'border-[#CBD5E1] bg-[#F8FAFC] text-[#111827] hover:border-[#22D3EE]'
                : 'border-[#22D3EE]/40 bg-[#111827] text-[#F9FAFB] hover:border-[#22D3EE]'
            }`}
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
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
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#22D3EE] animate-pulse-line" />
    </header>
  )
}
