import type { ComponentType } from 'react'

export type Lesson = {
  id: string // URL slug, unique within its module. Never rename after launch: it is the saved-progress key.
  title: string
  xp: number
  Component: ComponentType
}

export type Module = {
  id: string // URL slug, unique across the site
  title: string
  blurb: string
  lessons: Lesson[]
}
