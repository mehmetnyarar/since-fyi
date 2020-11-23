import {
  getEvent,
  getEventReminder,
  getReminder,
  getReminderFromPreset,
  getSchedule,
  getSchedules
} from '~/models/factory'
import { DEFAULT_REMINDER, Frequency } from '~/models/reminder'
import { Schedule } from '~/models/schedule'
import { getTime } from '~/utility'

const date = new Date()
const month = date.getMonth() + 1
const day = date.getDate()
const weekday = date.getDay()
const time = getTime(date)
const isActive = true
const schedule: Schedule = {
  month,
  day,
  time,
  isActive
}

describe('models/factory', () => {
  it('should create a schedule', () => {
    expect(getSchedule()).toBeUndefined()
    expect(getSchedule(date)).toBeUndefined()
    expect(getSchedule(undefined, Frequency.DAY)).toBeUndefined()
    expect(getSchedule(date, Frequency.MINUTE)).toBeUndefined()
    expect(getSchedule(date, Frequency.HOUR)).toBeUndefined()
    expect(getSchedule(date, Frequency.DAY)).toEqual({
      month: undefined,
      day: undefined,
      time,
      isActive
    })
    expect(getSchedule(date, Frequency.WEEK)).toEqual({
      month: undefined,
      day: weekday,
      time,
      isActive
    })
    expect(getSchedule(date, Frequency.MONTH)).toEqual({
      month: undefined,
      day,
      time,
      isActive
    })
    expect(getSchedule(date, Frequency.YEAR)).toEqual({
      month,
      day,
      time,
      isActive
    })
  })

  it('should return schedules', () => {
    expect(getSchedules()).toEqual([])
    expect(getSchedules(undefined, undefined, [schedule])).toHaveLength(1)
    expect(getSchedules(date, Frequency.DAY)).toHaveLength(1)
    expect(getSchedules(date, Frequency.YEAR, [schedule])).toHaveLength(2)
  })

  it('should return a reminder from a preset', () => {
    expect(getReminderFromPreset()).toEqual({})
    expect(getReminderFromPreset('DAY_1')).toEqual({})
    expect(getReminderFromPreset('DAY.1')).toEqual({
      frequency: Frequency.DAY,
      every: 1
    })
  })

  it('should return a reminder', () => {
    expect(getReminder()).toEqual(DEFAULT_REMINDER)
    expect(getReminder(date, { preset: 'WEEK.2' })).toEqual({
      notificationId: undefined,
      preset: 'WEEK.2',
      frequency: Frequency.WEEK,
      every: 2,
      schedules: [
        {
          month: undefined,
          day: weekday,
          time,
          isActive
        }
      ]
    })

    expect(getEventReminder({ hasReminder: false })).toBeNull()
    expect(getEventReminder({ start: date, hasReminder: true })).toBeDefined()
  })

  it('should return event', () => {
    expect(getEvent()).toBeDefined()
  })
})
