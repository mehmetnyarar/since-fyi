/**
 * Notification schedule.
 */
export interface Schedule {
  /**
   * Specifies which day that the notification should be sent.
   * For the frequencies MINUTE, HOUR and DAY, the value has no effect.
   * For WEEK frequency,  the value must be within the range of [1, 7].
   * For MONTH frequency, the value must be within the range of [1, 31].
   * For YEAR frequency, the value must be within the range of [1, 365].
   */
  on: number
  /**
   * Specifies the time that the notification should be sent.
   * Format: HH:mm.
   */
  time: string
  /**
   * Indicates whether the schedule is enabled or not.
   */
  active: boolean
}
