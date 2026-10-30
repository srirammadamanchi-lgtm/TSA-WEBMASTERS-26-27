// Pure game data: AI models you collect with trophies, and ranks. No React, no storage.
export type GameModel = { id: string; name: string; strength: string; unlockAt: number; art: string }

const model = (id: string, name: string, strength: string, unlockAt: number): GameModel => ({
  id,
  name,
  strength,
  unlockAt,
  art: `/art/models/${id}.svg`, // swapping in real AI art later = replace the file
})

// Order here is the display order.
export const MODELS: GameModel[] = [
  model('scribe', 'Scribe', 'Writing', 0),
  model('swift', 'Swift', 'Fast and cheap', 100),
  model('coda', 'Coda', 'Coding', 250),
  model('scout', 'Scout', 'Research', 500),
  model('sage', 'Sage', 'Math and reasoning', 800),
  model('polyglot', 'Polyglot', 'Languages', 1200),
  model('lumen', 'Lumen', 'Images', 1700),
  model('muse', 'Muse', 'Creative work', 2500),
]

export const RANKS = [
  { name: 'I', at: 0 },
  { name: 'II', at: 300 },
  { name: 'III', at: 1000 },
  { name: 'IV', at: 2000 },
]

export const unlockedModels = (trophies: number) => MODELS.filter((m) => trophies >= m.unlockAt)

export function nextUnlock(trophies: number) {
  const next = MODELS.find((m) => m.unlockAt > trophies)
  return next ? { model: next, remaining: next.unlockAt - trophies } : null
}

export const rankFor = (trophies: number) => RANKS.filter((r) => trophies >= r.at).at(-1) ?? RANKS[0]
