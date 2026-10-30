import { useEffect, useSyncExternalStore } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import { SITE_NAME } from '../site'
import { PALETTE } from '../palette'
import ClickSpark from './reactbits/ClickSpark'
import SplashCursor from './reactbits/SplashCursor'
import { PageBackground } from './PageBackground'
import { BackIcon, HomeIcon } from './Icons'

const iconButton =
  'inline-flex size-11 items-center justify-center rounded-full border border-line bg-card text-ink transition hover:border-brand'

// Splash Cursor only for a real mouse with motion allowed; touch devices would pay the GPU cost for nothing.
const cursorQuery = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const subscribeCursor = (cb: () => void) => {
  const mq = window.matchMedia(cursorQuery)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useSplashAllowed = () =>
  useSyncExternalStore(subscribeCursor, () => window.matchMedia(cursorQuery).matches, () => false)

export function Layout() {
  const splash = useSplashAllowed()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const atStart = pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // history.state.idx is 0 on the first page of a visit; going back would leave the site.
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'))

  return (
    <ClickSpark sparkColor={PALETTE.accent} className="flex min-h-screen flex-col">
      <PageBackground />
      {splash && <SplashCursor colors={[PALETTE.brand]} rainbow={false} />}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded focus:bg-card focus:p-2">
        Skip to content
      </a>

      <header className="relative z-10">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          {!atStart && (
            <button type="button" className={iconButton} aria-label="Go back" onClick={goBack}>
              <BackIcon />
            </button>
          )}
          <Link to="/" className={iconButton} aria-label="Home">
            <HomeIcon />
          </Link>
          <span className="font-display text-xl text-accent">{SITE_NAME}</span>
        </div>
      </header>

      {/* translateZ(0): own GPU layer, else Chrome composited the WebGL background over 3D-transformed content (folders, tilted card). */}
      <main id="main" className="relative z-10 isolate [transform:translateZ(0)] mx-auto w-full max-w-5xl flex-1 px-4 py-4">
        <Outlet />
      </main>

      <footer className="relative z-10">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-4 py-4 text-sm text-muted">
          <span>{SITE_NAME}</span>
          <Link to="/references" className="underline hover:text-ink">
            References
          </Link>
        </div>
      </footer>
    </ClickSpark>
  )
}
