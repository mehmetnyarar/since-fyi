import { Schedule } from '../schedule'
import { Frequency } from './enum'

/**
 * Since reminder.
 */
export interface Reminder {
  /**
   * Notification ID.
   * @see https://docs.expo.io/versions/latest/sdk/notifications/#scheduling-notifications.
   */
  notificationId?: string
  /**
   * Preset.
   */
  preset: string
  /**
   * Notification frequency.
   */
  frequency: Frequency
  /**
   * Repetition value; e.g. every **45** _MINUTE_, every **(1)** _DAY_,
   * every **2** _WEEK_, every **3** _MONTH_, etc.
   */
  every: number
  /**
   * Specifies the times for the notifications to be sent.
   * Can be specified for the frequencies: DAY and above.
   */
  schedules: Schedule[]
}

/**
 * Reminder preset.
 */
export type ReminderPreset = Pick<Reminder, 'frequency' | 'every'>
