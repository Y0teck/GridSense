import { createContext, createElement, useState } from 'react'

export const LanguageContext = createContext({ lang: 'fr', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [langState, setLangState] = useState(() => {
    const savedLang = window.localStorage.getItem('energIA-lang')
    return savedLang === 'en' || savedLang === 'fr' ? savedLang : 'fr'
  })

  function setLang(newLang) {
    setLangState(newLang)
    window.localStorage.setItem('energIA-lang', newLang)
  }

  return createElement(LanguageContext.Provider, { value: { lang: langState, setLang } }, children)
}
