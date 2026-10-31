import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AVATARS, NICKNAME_RE, saveIdentity, useProfile } from '../profile'

type Props = { open: boolean; required: boolean; onClose: () => void }

// Native <dialog>: focus trapping, Esc and the backdrop come from the browser.
// Opens by itself while no nickname is saved (required), and again from the gear button.
export function ProfileSetup({ open, required, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="setup-title"
      onCancel={(e) => required && e.preventDefault()}
      onClose={onClose}
      className="m-auto w-[min(92vw,28rem)] rounded-2xl border border-line bg-card p-6 text-ink backdrop:bg-black/70"
    >
      {open && <SetupForm required={required} onDone={onClose} />}
    </dialog>
  )
}

// Mounted only while open, so the fields always start from the saved profile.
function SetupForm({ required, onDone }: { required: boolean; onDone: () => void }) {
  const profile = useProfile()
  const [nickname, setNickname] = useState(profile.nickname ?? '')
  const [avatar, setAvatar] = useState(profile.avatar)
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!NICKNAME_RE.test(nickname)) {
      setError('Use 2 to 16 letters, numbers or underscores.')
      return
    }
    saveIdentity(nickname, avatar)
    onDone()
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <h2 id="setup-title" className="font-display text-2xl text-accent">
        {required ? 'Create your player' : 'Edit your player'}
      </h2>

      <div>
        <label htmlFor="nickname" className="block font-semibold">
          Nickname
        </label>
        <input
          id="nickname"
          value={nickname}
          maxLength={16}
          autoComplete="off"
          aria-describedby="nickname-hint"
          aria-invalid={error ? true : undefined}
          onChange={(e) => {
            setNickname(e.target.value)
            setError('')
          }}
          className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink"
        />
        <p id="nickname-hint" className="mt-1 text-sm text-muted">
          Don't use your real name. Letters, numbers and underscores only.
        </p>
        {error && (
          <p role="alert" className="mt-1 text-sm font-semibold text-brand">
            {error}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="font-semibold">Pick an avatar</legend>
        <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {AVATARS.map((id, i) => (
            <label
              key={id}
              className="cursor-pointer rounded-xl border-2 border-line bg-surface p-1 has-[:checked]:border-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand"
            >
              <input
                type="radio"
                name="avatar"
                value={id}
                checked={avatar === id}
                onChange={() => setAvatar(id)}
                className="sr-only"
              />
              <img src={`/art/avatars/${id}.svg`} alt={`Avatar ${i + 1}`} className="aspect-square w-full rounded-lg bg-ink" />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end gap-3">
        {!required && (
          <button type="button" className="rounded-lg px-4 py-2 font-semibold text-muted hover:text-ink" onClick={onDone}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn">
          Save
        </button>
      </div>
    </form>
  )
}
