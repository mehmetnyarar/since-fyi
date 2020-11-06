import { Notification } from '../notification'

/**
 * Since event.
 */
export interface Event {
  /**
   * Event ID.
   */
  id?: string
  /**
   * Event title.
   */
  title: string
  /**
   * Start date.
   */
  start?: Date
  /**
   * Elapsed time - a computed value.
   */
  ago: number
  /**
   * Indicates whether the elapsed time should be computed or not.
   */
  active: boolean
  /**
   * Notification settings.
   */
  notification: Notification
}
