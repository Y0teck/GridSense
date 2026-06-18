import { NavLink } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useTheme } from '../ThemeContext'
import { useStrings } from '../i18n/useStrings'

export default function NavMenu() {
  const theme = useTheme()
  const isLight = theme === 'light'
  const s = useStrings()

  return (
    <nav className={`${isLight ? 'bg-white' : 'bg-[#111827]'}`}>
      <div className="mx-auto flex h-11 max-w-7xl items-center gap-8 px-6">
        {ROUTES.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end={route.path === '/'}
            className={({ isActive }) =>
              `flex h-11 items-center border-b-2 text-sm no-underline transition ${
                isActive
                  ? 'border-[#22D3EE] font-semibold text-[#22D3EE]'
                  : `border-transparent ${
                      isLight ? 'text-[#64748B]' : 'text-[#9CA3AF]'
                    } hover:text-[#22D3EE]`
              }`
            }
          >
            {s.nav[route.key]}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
