import { Reminder } from '../reminder'

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
   * Indicates whether the event is active or not.
   * If true, elapsed time will be computed.
   */
  isActive: boolean
  /**
   * Indicates whether the event has a reminder or not.
   * If true, notifications will be sent to the user
   * based on reminder settings.
   */
  hasReminder: boolean
  /**
   * Reminder settings.
   */
  reminder?: Reminder | null
}
