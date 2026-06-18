import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useTheme } from '../ThemeContext'
import { useStrings } from '../i18n/useStrings'

const visibleRoutes = ROUTES.filter((route) => !route.hidden)

export default function NavMenu() {
  const theme = useTheme()
  const isLight = theme === 'light'
  const s = useStrings()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const linkClass = (isActive, navRight = false) =>
    `flex h-11 items-center border-b-2 text-sm no-underline transition ${navRight ? 'ml-auto' : ''} ${
      isActive
        ? 'border-[#22D3EE] font-semibold text-[#22D3EE]'
        : `border-transparent ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'} hover:text-[#22D3EE]`
    }`

  return (
    <nav className={isLight ? 'bg-white' : 'bg-[#111827]'}>
      {/* Desktop */}
      <div className="mx-auto hidden h-11 max-w-7xl items-center gap-8 px-6 md:flex">
        {visibleRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end={route.path === '/'}
            className={({ isActive }) => linkClass(isActive, route.navRight)}
          >
            {s.nav[route.key]}
          </NavLink>
        ))}
      </div>

      {/* Mobile */}
      <div className="flex h-11 items-center justify-between px-4 md:hidden">
        <span className={`text-sm font-semibold ${isLight ? 'text-[#111827]' : 'text-[#F9FAFB]'}`}>
          {s.nav[visibleRoutes.find((r) => r.path === location.pathname)?.key] ?? 'Menu'}
        </span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          className={`flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-md transition ${
            isLight ? 'text-[#64748B] hover:text-[#22D3EE]' : 'text-[#9CA3AF] hover:text-[#22D3EE]'
          }`}
        >
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-all ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className={`absolute left-0 right-0 z-50 border-t shadow-xl md:hidden ${
            isLight ? 'border-[#E2E8F0] bg-white' : 'border-[#1F2937] bg-[#111827]'
          }`}
        >
          {visibleRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.path === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block border-l-2 px-6 py-3 text-sm no-underline transition ${
                  isActive
                    ? 'border-[#22D3EE] font-semibold text-[#22D3EE]'
                    : `border-transparent ${isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'} hover:text-[#22D3EE]`
                }`
              }
            >
              {s.nav[route.key]}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
