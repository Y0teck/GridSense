import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { ROUTES } from './routes'
import ScrollToTopButton from './components/ScrollToTop'
import { ThemeContext } from './ThemeContext'
import { LanguageProvider } from './LanguageContext'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('gridsense-theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  })

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('gridsense-theme', nextTheme)
      return nextTheme
    })
  }

  const landingRoutes = ROUTES.filter((route) => route.hidden)
  const appRoutes = ROUTES.filter((route) => !route.hidden)

  return (
    <ThemeContext.Provider value={theme}>
      <LanguageProvider>
        <Routes>
          {landingRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {landingRoutes.flatMap((route) =>
            (route.aliases ?? []).map((alias) => (
              <Route key={alias} path={alias} element={route.element} />
            )),
          )}
          <Route element={<Layout theme={theme} onToggleTheme={toggleTheme} />}>
            {appRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            {appRoutes.flatMap((route) =>
              (route.aliases ?? []).map((alias) => (
                <Route key={alias} path={alias} element={route.element} />
              )),
            )}
          </Route>
        </Routes>
        <ScrollToTopButton />
      </LanguageProvider>
    </ThemeContext.Provider>
  )
}
