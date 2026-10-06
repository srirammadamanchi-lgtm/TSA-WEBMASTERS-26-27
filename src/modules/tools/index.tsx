import type { Module } from '../../types'
import PromptingBasics from './PromptingBasics'

// To add a lesson: create a component file in this folder, then add one entry below.
const tools: Module = {
  id: 'tools',
  title: 'Tools & Techniques',
  blurb: 'Practical AI tools for school and the prompting techniques that get useful results.',
  lessons: [{ id: 'prompting-basics', title: 'Prompting basics', xp: 50, Component: PromptingBasics }],
}

export default tools
