import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears
} from 'date-fns'

/**
 * TimeSpan units.
 */
export type TimeSpanUnit =
  | 'years'
  | 'months'
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'

/**
 * Timespan.
 */
export interface TimeSpan {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Calculates the timespan for a specific time unit.
 * @param total Number of item in the current time unit.
 * @param count Number of items in the upper time unit.
 * @param factor Number of current time unit items within the upper time unit.
 * @returns Span.
 */
export const unitspan = (total: number, count: number, factor: number) => {
  return total - count * factor
}

/**
 * Calculates a timespan from the total timespan.
 * @param total Timespane with total values.
 * @returns TimeSpan.
 */
export const timespan = (total: TimeSpan): TimeSpan => {
  const { years, months, weeks, days, hours, minutes, seconds } = total

  return {
    ...total,
    months: unitspan(months, years, 12),
    weeks: unitspan(weeks, months, 4),
    days: unitspan(days, weeks, 7),
    hours: unitspan(hours, days, 24),
    minutes: unitspan(minutes, hours, 60),
    seconds: unitspan(seconds, minutes, 60)
  }
}

/**
 * Calculates the timespan via date-fns.
 * @param date Date.
 * @returns TimeSpan.
 */
export const getTimeSpanFns = (date: Date) => {
  const now = new Date()

  return timespan({
    years: Math.abs(differenceInYears(date, now)),
    months: Math.abs(differenceInMonths(date, now)),
    weeks: Math.abs(differenceInWeeks(date, now)),
    days: Math.abs(differenceInDays(date, now)),
    hours: Math.abs(differenceInHours(date, now)),
    minutes: Math.abs(differenceInMinutes(date, now)),
    seconds: Math.abs(differenceInSeconds(date, now))
  })
}

/**
 * Floors the timespan.
 * @param span Timespan.
 * @param divider Divider.
 * @returns Timespan.
 */
export const floor = (span: number, divider: number) => {
  return Math.floor(span / divider)
}

/**
 * Calculates the timespan.
 * @param date Date.
 * @returns TimeSpan.
 */
export const getTimeSpan = (date: Date): TimeSpan => {
  const now = Date.now()
  const total: TimeSpan = {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  const diff = Math.abs(date.getTime() - now)
  total.seconds = floor(diff, 1000)
  total.minutes = floor(total.seconds, 60)
  total.hours = floor(total.minutes, 60)
  total.days = floor(total.hours, 24)
  total.weeks = floor(total.days, 7)
  total.months = floor(total.weeks, 4)
  total.years = floor(total.months, 12)

  return timespan(total)
}
