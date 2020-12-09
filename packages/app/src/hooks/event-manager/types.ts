import { Event } from '~/models'

/**
 * Event action.
 */
export type EventAction = 'create' | 'update' | 'upsert'

/**
 * EventManager.
 */
export interface EventManager {
  loading?: boolean
  result?: Event[]
  error?: string
  set: (events?: Event[]) => Promise<void>
  load: () => Promise<void>
  clear: () => Promise<void>
  select: (event?: string | Event) => void
  current?: Event
  create: (event: Event) => Promise<void>
  update: (event: Event) => Promise<void>
  remove: (id: string) => Promise<void>
}
