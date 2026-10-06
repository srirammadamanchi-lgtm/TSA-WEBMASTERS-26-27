import type { Module } from '../../types'
import AcademicIntegrity from './AcademicIntegrity'

// To add a lesson: create a component file in this folder, then add one entry below.
const ethics: Module = {
  id: 'ethics',
  title: 'Ethical AI Use',
  blurb: 'Academic integrity, bias, privacy, and knowing when AI should not do the work for you.',
  lessons: [{ id: 'academic-integrity', title: 'AI and academic integrity', xp: 50, Component: AcademicIntegrity }],
}

export default ethics
