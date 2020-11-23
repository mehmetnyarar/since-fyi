import { Event } from './type'

/**
 * Default event.
 */
export const DEFAULT_EVENT: Event = {
  id: undefined,
  title: '',
  start: undefined,
  isActive: false,
  hasReminder: false,
  reminder: null
}

/**
 * Maximum number of characters that the user is allowed to enter.
 */
export const EVENT_TITLE_MAX_LENGTH = 35
