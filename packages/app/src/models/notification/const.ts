import { Frequency } from './enum'
import { Notification } from './type'

/**
 * Default notification.
 */
export const DEFAULT_NOTIFICATION: Notification = {
  id: undefined,
  frequency: Frequency.DAY,
  every: 1,
  at: [],
  active: false
}
