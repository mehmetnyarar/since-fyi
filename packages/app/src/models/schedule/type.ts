/**
 * Notification schedule.
 */
export interface Schedule {
  /**
   * Month. The value must be
   * - [1, 12] for {Frequency.YEAR}
   */
  month?: number
  /**
   * Day of month. The value must be
   * - [1, 7] for {Frequency.WEEK}
   * - [1, 31] for {Frequency.MONTH}
   * - [1, 31] for {Frequency.YEAR}
   */
  day?: number
  /**
   * Specifies the time that the notification should be sent.
   * Format: HH:mm.
   */
  time: string
  /**
   * Indicates whether the schedule is enabled or not.
   */
  isActive: boolean
}
