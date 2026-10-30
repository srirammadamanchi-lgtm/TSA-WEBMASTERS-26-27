import type { Module } from './types'
import promptEngineering from './modules/prompt-engineering'
import concepts from './modules/concepts'
import ethics from './modules/ethics'

// Rename the site here; every page reads this.
export const SITE_NAME = 'TSA-Webmaster'

// Order here is the order shown on the site.
export const modules: Module[] = [promptEngineering, concepts, ethics]
