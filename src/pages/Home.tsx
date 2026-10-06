import { Link } from 'react-router'
import { SITE_NAME, modules } from '../site'
import { useProgress } from '../progress'
import { ProgressBar } from '../components/ProgressBar'

export function Home() {
  const { perModule } = useProgress()

  return (
    <>
      <title>{SITE_NAME}</title>

      {/* TODO(home owner): hero copy and artwork */}
      <section className="py-10 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Understand AI. Use it well.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          A learning portal for high school students: how AI works, the tools worth knowing, and how to use them
          responsibly in school.
        </p>
        <Link to={`/modules/${modules[0].id}`} className="btn mt-6">
          Start learning
        </Link>
      </section>

      <section aria-label="Learning modules" className="grid gap-4 md:grid-cols-3">
        {modules.map((m, i) => (
          <Link key={m.id} to={`/modules/${m.id}`} className="card flex flex-col gap-3 transition hover:shadow-md">
            <h2 className="text-xl font-bold">{m.title}</h2>
            <p className="flex-1 text-muted">{m.blurb}</p>
            <ProgressBar value={perModule[i].percent} label={`${m.title} progress`} />
            <p className="text-sm text-muted">
              {perModule[i].done} of {perModule[i].total} lessons complete
            </p>
          </Link>
        ))}
      </section>
    </>
  )
}
