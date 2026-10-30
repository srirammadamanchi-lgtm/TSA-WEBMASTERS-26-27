// The one progress store. Every page reads progress with useProgress() and
// writes it with completeLesson(). Saved in the browser only (no accounts: TSA rule).
import { useMemo } from 'react'
import { modules } from '../site'
import { createPersisted } from '../lib/persisted'
import { lessonKey, summarize } from './logic'

const store = createPersisted<string[]>('tsa-webmaster:completed', [], (raw) =>
  Array.isArray(raw) ? raw.filter((k) => typeof k === 'string') : null,
)

export function completeLesson(moduleId: string, lessonId: string) {
  const key = lessonKey(moduleId, lessonId)
  const completed = store.get()
  if (!completed.includes(key)) store.set([...completed, key])
}

export function resetProgress() {
  store.set([])
}

export function useProgress() {
  const list = store.use()
  return useMemo(
    () => ({
      ...summarize(list, modules),
      isDone: (moduleId: string, lessonId: string) => list.includes(lessonKey(moduleId, lessonId)),
    }),
    [list],
  )
}
