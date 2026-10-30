// Small inline icons (no icon library). Decorative: always paired with a text label or aria-label.
const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const

export const BackIcon = () => (
  <svg {...base}>
    <path d="M15.4 5.4 14 4l-8 8 8 8 1.4-1.4L8.8 12z" />
  </svg>
)

export const HomeIcon = () => (
  <svg {...base}>
    <path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z" />
  </svg>
)

export const GearIcon = () => (
  <svg {...base}>
    <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L14.9 3h-4l-.4 2.9a7.4 7.4 0 0 0-1.7 1l-2.5-1-2 3.5L6.4 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.4 7.4 0 0 0 1.7 1l.4 2.9h4l.4-2.9a7.4 7.4 0 0 0 1.7-1l2.5 1 2-3.5zM12.9 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
  </svg>
)

export const TrophyIcon = ({ size = 24 }: { size?: number }) => (
  <svg {...base} width={size} height={size}>
    <path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V17h3v2H8v-2h3v-2.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3zM6 7v1a2 2 0 0 0 1.2 1.8A5 5 0 0 1 7 8.5V7zm12 0h-1v1.5a5 5 0 0 1-.2 1.3A2 2 0 0 0 18 8z" />
  </svg>
)

export const LockIcon = () => (
  <svg {...base}>
    <path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM10 7a2 2 0 0 1 4 0v2h-4z" />
  </svg>
)

// Rank emblem: a shield showing the rank numeral.
export const RankEmblem = ({ rank, size = 40 }: { rank: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label={`Rank ${rank}`}>
    <path d="M24 3 6 9v14c0 11 7.5 19 18 22 10.5-3 18-11 18-22V9z" className="fill-accent" />
    <path d="M24 7 10 11.7V23c0 8.8 5.8 15.3 14 18 8.2-2.7 14-9.2 14-18V11.7z" className="fill-card" />
    <text x="24" y="30" textAnchor="middle" fontSize="16" className="fill-accent font-display">
      {rank}
    </text>
  </svg>
)
