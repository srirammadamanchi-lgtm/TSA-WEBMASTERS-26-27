// Pure progress math. No React, no localStorage, so it can be tested with `npm test`.
// XP, level and badges are all derived from the list of completed lesson keys.

type ModuleShape = { id: string; title: string; lessons: { id: string; xp: number }[] }

export const XP_PER_LEVEL = 100

export const lessonKey = (moduleId: string, lessonId: string) => `${moduleId}/${lessonId}`

export function summarize(completed: string[], modules: ModuleShape[]) {
  const done = new Set(completed)
  let xp = 0
  let totalLessons = 0
  let doneLessons = 0

  const perModule = modules.map((m) => {
    const finished = m.lessons.filter((l) => done.has(lessonKey(m.id, l.id)))
    xp += finished.reduce((sum, l) => sum + l.xp, 0)
    totalLessons += m.lessons.length
    doneLessons += finished.length
    return {
      id: m.id,
      done: finished.length,
      total: m.lessons.length,
      percent: m.lessons.length ? Math.round((finished.length / m.lessons.length) * 100) : 0,
    }
  })

  const badges = modules.map((m, i) => ({
    id: m.id,
    title: `${m.title} Complete`,
    earned: perModule[i].total > 0 && perModule[i].done === perModule[i].total,
  }))
  badges.push({
    id: 'graduate',
    title: 'Portal Graduate',
    earned: totalLessons > 0 && doneLessons === totalLessons,
  })

  return {
    xp,
    level: Math.floor(xp / XP_PER_LEVEL) + 1,
    xpIntoLevel: xp % XP_PER_LEVEL,
    totalLessons,
    doneLessons,
    percent: totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0,
    perModule,
    badges,
  }
}
