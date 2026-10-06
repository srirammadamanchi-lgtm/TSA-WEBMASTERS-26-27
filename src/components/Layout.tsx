import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { SITE_NAME, modules } from '../site'
import { useProgress } from '../progress'

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand text-white' : 'text-muted hover:text-ink'}`

export function Layout() {
  const { xp, level } = useProgress()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded focus:bg-card focus:p-2">
        Skip to content
      </a>

      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
          <Link to="/" className="text-lg font-bold text-brand">
            {SITE_NAME}
          </Link>
          <nav aria-label="Main" className="flex flex-1 flex-wrap items-center gap-1">
            {modules.map((m) => (
              <NavLink key={m.id} to={`/modules/${m.id}`} className={navClass}>
                {m.title}
              </NavLink>
            ))}
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
          </nav>
          <Link to="/dashboard" className="rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold">
            Level {level} · {xp} XP
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-card">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-4 py-4 text-sm text-muted">
          <span>{SITE_NAME}</span>
          <Link to="/references" className="underline hover:text-ink">
            References
          </Link>
        </div>
      </footer>
    </div>
  )
}
