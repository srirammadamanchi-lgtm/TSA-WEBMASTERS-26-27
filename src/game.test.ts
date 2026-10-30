import test from 'node:test'
import assert from 'node:assert/strict'
import { MODELS, nextUnlock, rankFor, unlockedModels } from './game.ts'

test('zero trophies: only Scribe, rank I, next is Swift', () => {
  assert.deepEqual(unlockedModels(0).map((m) => m.id), ['scribe'])
  assert.equal(rankFor(0).name, 'I')
  const next = nextUnlock(0)
  assert.equal(next?.model.id, 'swift')
  assert.equal(next?.remaining, 100)
})

test('900 trophies: five unlocked, rank II, next is Polyglot', () => {
  assert.equal(unlockedModels(900).length, 5)
  assert.equal(rankFor(900).name, 'II')
  assert.equal(nextUnlock(900)?.model.id, 'polyglot')
  assert.equal(nextUnlock(900)?.remaining, 300)
})

test('max trophies: everything unlocked, top rank, nothing next', () => {
  assert.equal(unlockedModels(99999).length, MODELS.length)
  assert.equal(rankFor(99999).name, 'IV')
  assert.equal(nextUnlock(99999), null)
})
