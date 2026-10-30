import { useSyncExternalStore } from 'react'
import { useLocation } from 'react-router'
import { PALETTE } from '../palette'
import Cubes from './reactbits/Cubes'
import DotGrid from './reactbits/DotGrid'
import ShapeGrid from './reactbits/ShapeGrid'

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
        <Cubes
          key={group}
          gridSize={narrow ? 8 : 12}
          autoAnimate
          rippleOnClick
          faceColor={PALETTE.card}
          edgeColor={PALETTE.accent}
          rippleColor={PALETTE.ink}
        />
      )}
      {group === 'learn' && (
        <DotGrid key={group} baseColor={PALETTE.brandDark} activeColor={PALETTE.accent} opacity={0.6} />
      )}
      {group === 'read' && (
        <ShapeGrid
          key={group}
          direction="diagonal"
          speed={0.3}
          lineColor={PALETTE.line}
          hoverColor={PALETTE.brand}
          hoverFillColor={PALETTE.brandDark}
        />
      )}
    </div>
  )
}
