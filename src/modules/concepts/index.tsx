import type { Module } from '../../types'
import WhatIsAI from './WhatIsAI'

// To add a lesson: create a component file in this folder, then add one entry below.
const concepts: Module = {
  id: 'concepts',
  title: 'AI Fundamentals',
  blurb: 'What AI actually is, how machines learn from data, and what large language models do.',
  lessons: [{ id: 'what-is-ai', title: 'What is AI?', xp: 50, Component: WhatIsAI }],
}

export default concepts
