// The one progress store. Every page reads progress with useProgress() and
// writes it with completeLesson(). Saved in the browser only (no accounts: TSA rule).
import { useMemo, useSyncExternalStore } from 'react'
import { modules } from '../site'
import { lessonKey, summarize } from './logic'

const STORAGE_KEY = 'tsa-webmaster:completed'

function load(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((k) => typeof k === 'string') : []
  } catch {
    return [] // private mode or corrupted data: start fresh, site still works
  }
}

let completed = load()
const listeners = new Set<() => void>()

function set(next: string[]) {
  completed = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // storage unavailable: progress lasts for this visit only
  }
  listeners.forEach((notify) => notify())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function completeLesson(moduleId: string, lessonId: string) {
  const key = lessonKey(moduleId, lessonId)
  if (!completed.includes(key)) set([...completed, key])
}

export function resetProgress() {
  set([])
}

export function useProgress() {
  const list = useSyncExternalStore(subscribe, () => completed)
  return useMemo(
    () => ({
      ...summarize(list, modules),
      isDone: (moduleId: string, lessonId: string) => list.includes(lessonKey(moduleId, lessonId)),
    }),
    [list],
  )
}
