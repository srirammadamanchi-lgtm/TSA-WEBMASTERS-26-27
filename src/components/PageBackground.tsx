import { useSyncExternalStore } from 'react'
import { useLocation } from 'react-router'
import { PALETTE } from '../palette'
import FluxLines from './reactbits/FluxLines'
import Particles from './reactbits/Particles'
import Topography from './reactbits/Topography'

const narrowQuery = '(max-width: 639px)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(narrowQuery)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useNarrow = () => useSyncExternalStore(subscribe, () => window.matchMedia(narrowQuery).matches, () => false)

// One fixed, decorative background per page group. Reduced motion is handled inside the React Bits components.
// Remounts when the group changes (key) so each page plays its own intro.
export function PageBackground() {
  const { pathname } = useLocation()
  const narrow = useNarrow()
  const group = pathname === '/' ? 'start' : pathname === '/learn' ? 'learn' : 'read'

  return (
    <div aria-hidden className="fixed inset-0 z-0 bg-surface">
      {group === 'start' && (
        <FluxLines key={group} colors={[PALETTE.ink, PALETTE.muted, PALETTE.ink]} opacity={0.7} dpr={narrow ? 1 : undefined} />
      )}
      {group === 'learn' && (
        <Topography key={group} color={PALETTE.muted} lineCount={narrow ? 14 : 22} dpr={narrow ? 1 : undefined} />
      )}
      {group === 'read' && (
        <Particles
          key={group}
          particleColors={[PALETTE.ink, PALETTE.muted]}
          particleCount={narrow ? 100 : 200}
          clickBurst={false}
        />
      )}
    </div>
  )
}
