// A tiny localStorage-backed store usable as a React hook. Browser only (no accounts: TSA rule).
// validate() must return a clean value or null; null means "use the fallback".
import { useSyncExternalStore } from 'react'

export function createPersisted<T>(key: string, fallback: T, validate: (raw: unknown) => T | null) {
  function load(): T {
    try {
      const raw = localStorage.getItem(key)
      return (raw === null ? null : validate(JSON.parse(raw))) ?? fallback
    } catch {
      return fallback // private mode or corrupted data: start fresh, site still works
    }
  }

  let value = load()
  const listeners = new Set<() => void>()

  function set(next: T) {
    value = next
    try {
      localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // storage unavailable: data lasts for this visit only
    }
    listeners.forEach((notify) => notify())
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { get: () => value, set, use: () => useSyncExternalStore(subscribe, () => value) }
}
