import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import NavMenu from './components/NavMenu'
import { ThemeContext } from './ThemeContext'
import { LanguageProvider } from './LanguageContext'

export default function Layout() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('energia-theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  })
  const isLight = theme === 'light'

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('energia-theme', nextTheme)
      return nextTheme
    })
  }

  return (
    <ThemeContext.Provider value={theme}>
      <LanguageProvider>
        <div
          className={`min-h-screen transition-colors ${
            isLight ? 'bg-[#F8FAFC] text-[#111827]' : 'bg-[#0A0F1E] text-[#F9FAFB]'
          }`}
        >
          <Header theme={theme} onToggleTheme={toggleTheme} />
          <NavMenu />
          <main>
            <Outlet />
          </main>
        </div>
      </LanguageProvider>
    </ThemeContext.Provider>
  )
}
