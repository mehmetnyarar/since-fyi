import { Frequency } from './enum'
import { Notification } from './type'

/**
 * Default notification presets.
 */
export const DEFAULT_PRESETS = [
  'MINUTE_15',
  'MINUTE_30',
  'MINUTE_45',
  'HOUR_1',
  'HOUR_2',
  'HOUR_3',
  'HOUR_4',
  'HOUR_6',
  'HOUR_12',
  'DAY_1',
  'DAY_2',
  'DAY_3',
  'WEEK_1',
  'WEEK_2',
  'MONTH_1',
  'MONTH_2',
  'MONTH_3',
  'MONTH_4',
  'MONTH_6',
  'YEAR_1'
  // 'CUSTOM' // User-defined
]

/**
 * Default notification.
 */
export const DEFAULT_NOTIFICATION: Notification = {
  id: undefined,
  preset: 'DAY_1',
  frequency: Frequency.DAY,
  every: 1,
  at: [],
  active: false
}
