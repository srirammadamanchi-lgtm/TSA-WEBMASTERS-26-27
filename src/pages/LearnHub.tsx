import { useState } from 'react'
import { SITE_NAME, modules } from '../site'
import { PALETTE } from '../palette'
import Folder from '../components/reactbits/Folder'

// One folder per module. Lessons are not written yet, so every folder says "Coming soon".
export function LearnHub() {
  const [opened, setOpened] = useState<string | null>(null)

  return (
    <>
      <title>{`Learn · ${SITE_NAME}`}</title>
      <h1 className="font-display text-4xl text-accent">Choose a folder</h1>
      <p className="mt-2 text-muted">Open a folder to see what is inside.</p>

      <ul className="mt-8 grid gap-8 sm:grid-cols-3">
        {modules.map((m) => (
          <li key={m.id} className="flex flex-col items-center gap-3 text-center">
            <Folder
              label={m.title}
              color={PALETTE.soft}
              items={['Coming soon']}
              onOpenChange={(open) => setOpened((cur) => (open ? m.id : cur === m.id ? null : cur))}
            />
            <p className="max-w-xs text-sm text-muted">{m.blurb}</p>
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="mt-8 min-h-8 text-center font-display text-2xl text-ink">
        {opened && `${modules.find((m) => m.id === opened)?.title}: Coming soon`}
      </p>
    </>
  )
}
