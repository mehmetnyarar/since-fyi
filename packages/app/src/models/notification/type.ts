import { Schedule } from '../schedule'
import { Frequency } from './enum'

/**
 * Since notification.
 */
export interface Notification {
  /**
   * Notification ID.
   */
  id?: string
  /**
   * Notification frequency.
   */
  frequency: Frequency
  /**
   * Repetition value for the notification frequency,
   * e.g. every **45** _MINUTE_, every **(1)** _DAY_,
   * every **2** _WEEK_, every **3** _MONTH_, etc.
   */
  every: number
  /**
   * Specifies the times for the notifications to be sent.
   * Can be specified for the frequencies: DAY and above.
   */
  at: Schedule[]
  /**
   * Indicates whether sending notifications are enabled or not.
   */
  active: boolean
}
