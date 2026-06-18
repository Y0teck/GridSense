import { createContext, createElement, useState } from 'react'

export const LanguageContext = createContext({ lang: 'fr', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [langState, setLangState] = useState(() => {
    const savedLang = window.localStorage.getItem('gridsense-lang')
    return savedLang === 'en' || savedLang === 'fr' ? savedLang : 'en'
  })

  function setLang(newLang) {
    setLangState(newLang)
    window.localStorage.setItem('gridsense-lang', newLang)
  }

  return createElement(LanguageContext.Provider, { value: { lang: langState, setLang } }, children)
}
