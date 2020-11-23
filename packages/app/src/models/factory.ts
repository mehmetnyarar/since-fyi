import merge from 'lodash/merge'
import { getTime } from '~/utility'
import { DEFAULT_EVENT, Event } from './event'
import {
  DEFAULT_REMINDER,
  Frequency,
  Reminder,
  ReminderPreset
} from './reminder'
import { DEFAULT_SCHEDULE, Schedule } from './schedule'

/**
 * Determines which frequencies can be used.
 */
export const FREQUENCY_AVAILABILITY = [
  Frequency.MINUTE,
  Frequency.HOUR,
  Frequency.DAY,
  Frequency.WEEK,
  Frequency.MONTH,
  Frequency.YEAR
]

/**
 * Determines for which frequencies schedules can be added or removed.
 */
export const SCHEDULE_AVAILABILITY = [
  Frequency.DAY,
  Frequency.WEEK,
  Frequency.MONTH,
  Frequency.YEAR
]

/**
 * Default notification presets.
 */
export const PRESETS: ReminderPreset[] = [
  { frequency: Frequency.MINUTE, every: 15 },
  { frequency: Frequency.MINUTE, every: 30 },
  { frequency: Frequency.MINUTE, every: 45 },
  { frequency: Frequency.HOUR, every: 1 },
  { frequency: Frequency.HOUR, every: 2 },
  { frequency: Frequency.HOUR, every: 3 },
  { frequency: Frequency.HOUR, every: 4 },
  { frequency: Frequency.HOUR, every: 6 },
  { frequency: Frequency.HOUR, every: 8 },
  { frequency: Frequency.HOUR, every: 12 },
  { frequency: Frequency.DAY, every: 1 },
  { frequency: Frequency.DAY, every: 2 },
  { frequency: Frequency.DAY, every: 3 },
  { frequency: Frequency.WEEK, every: 1 },
  { frequency: Frequency.WEEK, every: 2 },
  { frequency: Frequency.MONTH, every: 1 },
  { frequency: Frequency.MONTH, every: 2 },
  { frequency: Frequency.MONTH, every: 3 },
  { frequency: Frequency.MONTH, every: 4 },
  { frequency: Frequency.MONTH, every: 6 },
  { frequency: Frequency.YEAR, every: 1 }
]

/**
 * Creates a schedule.
 * @param [date] Date.
 * @param [frequency] Frequency.
 * @returns Schedule.
 */
export const getSchedule = (
  date?: Date,
  frequency?: Frequency
): Schedule | undefined => {
  if (!date || !frequency) return undefined
  if (!SCHEDULE_AVAILABILITY.includes(frequency)) return undefined

  return merge({}, DEFAULT_SCHEDULE, {
    month: frequency === Frequency.YEAR ? date.getMonth() + 1 : undefined,
    day:
      frequency === Frequency.WEEK
        ? date.getDay()
        : [Frequency.MONTH, Frequency.YEAR].includes(frequency)
            ? date.getDate()
            : undefined,
    time: getTime(date),
    isActive: true
  })
}

/**
 * Creates default schedules based on date and frequency
 * or adds a new schedule to existing schedules.
 * @param [date] Date.
 * @param [frequency] Frequency.
 * @param [initial=[]] Initial values.
 * @returns Schedules.
 */
export const getSchedules = (
  date?: Date,
  frequency?: Frequency,
  initial: Schedule[] = []
): Schedule[] => {
  const schedule = getSchedule(date, frequency)

  return schedule ? initial.concat(schedule) : initial
}

/**
 * Creates a Reminder from a preset.
 * @param [preset] Preset.
 * @returns Reminder.
 */
export const getReminderFromPreset = (preset?: string): Partial<Reminder> => {
  if (!preset) return {}
  if (!preset.includes('.')) return {}

  const [frequency, every] = preset.split('.')

  return {
    frequency: frequency as Frequency,
    every: Number(every)
  }
}

/**
 * Creates a Reminder.
 * @param [date] Date.
 * @param [initial={}] Initial value.
 * @returns Reminder.
 */
export const getReminder = (
  date?: Date,
  initial: Partial<Reminder> | null = {}
): Reminder => {
  if (!date) return DEFAULT_REMINDER

  const preset = getReminderFromPreset(initial?.preset)
  const reminder = merge({}, DEFAULT_REMINDER, initial, preset)

  const { frequency, schedules } = reminder

  return {
    ...reminder,
    schedules: getSchedules(date, frequency, schedules)
  }
}

/**
 * Creates a Reminder.
 * @param event Event.
 * @returns Reminder.
 */
export const getEventReminder = (event: Partial<Event>) => {
  const { start, hasReminder, reminder } = event

  return hasReminder ? getReminder(start, reminder) : null
}

/**
 * Creates an Event.
 * @param [initial={}] Initial value.
 * @returns Event.
 */
export const getEvent = (initial: Partial<Event> = {}): Event => {
  const {
    start = new Date(),
    isActive = true,
    hasReminder = false,
    reminder = null
  } = initial
  const event: Event = merge({}, DEFAULT_EVENT, {
    ...initial,
    start,
    isActive,
    hasReminder,
    reminder
  })

  return {
    ...event,
    reminder: getEventReminder(event)
  }
}
