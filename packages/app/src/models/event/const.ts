import { DEFAULT_NOTIFICATION } from '../notification'
import { Event } from './type'

/**
 * Default event.
 */
export const DEFAULT_EVENT: Event = {
  id: undefined,
  title: '',
  start: undefined,
  ago: 0,
  active: false,
  notification: DEFAULT_NOTIFICATION
}
