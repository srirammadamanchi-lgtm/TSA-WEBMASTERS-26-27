import { Link } from 'react-router'
import { SITE_NAME, modules } from '../site'
import { resetProgress, useProgress } from '../progress'
import { XP_PER_LEVEL } from '../progress/logic'
import { ProgressBar } from '../components/ProgressBar'

export function Dashboard() {
  const p = useProgress()

  return (
    <>
      <title>{`Dashboard · ${SITE_NAME}`}</title>
      <h1 className="text-3xl font-extrabold">Your progress</h1>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm text-muted">Level</p>
          <p className="text-4xl font-extrabold text-brand">{p.level}</p>
          <div className="mt-3">
            <ProgressBar value={(p.xpIntoLevel / XP_PER_LEVEL) * 100} label="Progress to next level" />
          </div>
          <p className="mt-2 text-sm text-muted">
            {XP_PER_LEVEL - p.xpIntoLevel} XP to level {p.level + 1}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-muted">Experience</p>
          <p className="text-4xl font-extrabold">{p.xp} XP</p>
        </div>
        <div className="card">
          <p className="text-sm text-muted">Lessons</p>
          <p className="text-4xl font-extrabold">
            {p.doneLessons}/{p.totalLessons}
          </p>
          <div className="mt-3">
            <ProgressBar value={p.percent} label="Overall progress" />
          </div>
        </div>
      </section>

      <h2 className="mt-10 text-2xl font-bold">Modules</h2>
      <ul className="mt-4 space-y-3">
        {modules.map((m, i) => (
          <li key={m.id} className="card">
            <div className="mb-2 flex justify-between gap-4">
              <Link to={`/modules/${m.id}`} className="font-semibold underline">
                {m.title}
              </Link>
              <span className="text-sm text-muted">
                {p.perModule[i].done}/{p.perModule[i].total}
              </span>
            </div>
            <ProgressBar value={p.perModule[i].percent} label={`${m.title} progress`} />
          </li>
        ))}
      </ul>

      {/* TODO(gamification owner): badge artwork, unlock animation */}
      <h2 className="mt-10 text-2xl font-bold">Badges</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {p.badges.map((b) => (
          <li key={b.id} className={`card text-center ${b.earned ? '' : 'opacity-50'}`}>
            <div aria-hidden className="text-4xl">
              {b.earned ? '🏅' : '🔒'}
            </div>
            <p className="mt-2 font-semibold">{b.title}</p>
            <p className="text-sm text-muted">{b.earned ? 'Earned' : 'Locked'}</p>
          </li>
        ))}
      </ul>

      <button
        className="mt-10 text-sm text-muted underline hover:text-ink"
        onClick={() => confirm('Erase all saved progress on this device?') && resetProgress()}
      >
        Reset progress
      </button>
    </>
  )
}
