import { Frequency } from './enum'
import { Reminder } from './type'

/**
 * Default reminder.
 */
export const DEFAULT_REMINDER: Reminder = {
  notificationId: undefined,
  preset: 'DAY.1',
  frequency: Frequency.DAY,
  every: 1,
  schedules: []
}
