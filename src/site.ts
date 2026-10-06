import type { Module } from './types'
import concepts from './modules/concepts'
import tools from './modules/tools'
import ethics from './modules/ethics'

// Rename the site here; every page reads this.
export const SITE_NAME = 'TSA-Webmaster'

// Order here is the order shown on the site.
export const modules: Module[] = [concepts, tools, ethics]
