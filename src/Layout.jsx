import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import NavMenu from './components/NavMenu'

export default function Layout({ theme, onToggleTheme }) {
  const isLight = theme === 'light'

  return (
    <div
      className={`min-h-screen transition-colors ${
        isLight ? 'bg-[#F8FAFC] text-[#111827]' : 'bg-[#0A0F1E] text-[#F9FAFB]'
      }`}
    >
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <NavMenu />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
