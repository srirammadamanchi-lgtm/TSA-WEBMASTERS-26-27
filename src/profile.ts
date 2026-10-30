// The player profile for the start page. Saved in the browser only (no accounts: TSA rule).
import { MODELS, unlockedModels } from './game'
import { createPersisted } from './lib/persisted'

export type Profile = { nickname: string | null; avatar: string; favoriteModel: string; trophies: number }

export const AVATARS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6']
export const NICKNAME_RE = /^[A-Za-z0-9_]{2,16}$/

const DEFAULTS: Profile = { nickname: null, avatar: 'a1', favoriteModel: 'scribe', trophies: 0 }

// ponytail: trophies is a plain number until the practice section defines scoring.
const store = createPersisted<Profile>('tsa-webmaster:profile', DEFAULTS, (raw) => {
  if (typeof raw !== 'object' || raw === null) return null
  const p = raw as Record<string, unknown>
  const trophies = typeof p.trophies === 'number' && p.trophies >= 0 ? Math.floor(p.trophies) : 0
  const favorite = unlockedModels(trophies).some((m) => m.id === p.favoriteModel)
  return {
    nickname: typeof p.nickname === 'string' && NICKNAME_RE.test(p.nickname) ? p.nickname : null,
    avatar: AVATARS.includes(p.avatar as string) ? (p.avatar as string) : DEFAULTS.avatar,
    favoriteModel: favorite ? (p.favoriteModel as string) : DEFAULTS.favoriteModel,
    trophies,
  }
})

export const useProfile = store.use

export function saveIdentity(nickname: string, avatar: string) {
  if (NICKNAME_RE.test(nickname) && AVATARS.includes(avatar)) store.set({ ...store.get(), nickname, avatar })
}

export function setFavorite(id: string) {
  const p = store.get()
  if (MODELS.some((m) => m.id === id) && unlockedModels(p.trophies).some((m) => m.id === id)) {
    store.set({ ...p, favoriteModel: id })
  }
}
