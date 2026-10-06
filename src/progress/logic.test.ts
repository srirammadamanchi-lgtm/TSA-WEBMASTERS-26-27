import test from 'node:test'
import assert from 'node:assert/strict'
import { summarize } from './logic.ts'

const modules = [
  { id: 'a', title: 'A', lessons: [{ id: 'one', xp: 60 }, { id: 'two', xp: 60 }] },
  { id: 'b', title: 'B', lessons: [{ id: 'one', xp: 50 }] },
]

test('empty progress', () => {
  const s = summarize([], modules)
  assert.equal(s.xp, 0)
  assert.equal(s.level, 1)
  assert.equal(s.percent, 0)
  assert.ok(s.badges.every((b) => !b.earned))
})

test('partial progress, unknown keys ignored', () => {
  const s = summarize(['a/one', 'a/two', 'gone/lesson'], modules)
  assert.equal(s.xp, 120)
  assert.equal(s.level, 2)
  assert.equal(s.xpIntoLevel, 20)
  assert.equal(s.doneLessons, 2)
  assert.deepEqual(s.badges.map((b) => b.earned), [true, false, false])
})

test('everything complete earns graduate badge', () => {
  const s = summarize(['a/one', 'a/two', 'b/one'], modules)
  assert.equal(s.percent, 100)
  assert.ok(s.badges.every((b) => b.earned))
})
