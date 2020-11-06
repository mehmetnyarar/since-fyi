import { omit } from 'lodash'
import { getEvent, getNotification, getSchedule } from '~/hooks/event-manager'
import {
  DEFAULT_EVENT,
  DEFAULT_NOTIFICATION,
  DEFAULT_SCHEDULE,
  Frequency
} from '~/models'

describe('hooks/event-manager/utility', () => {
  it('should create a new schedule', () => {
    let result = getSchedule(Frequency.DAY)
    expect(result).toEqual({
      ...DEFAULT_SCHEDULE
    })

    result = getSchedule(Frequency.MONTH)
    expect(result).toEqual({
      ...DEFAULT_SCHEDULE,
      on: 1
    })
  })

  it('should create a new notification', () => {
    let result = getNotification()
    expect(result).toEqual({
      ...DEFAULT_NOTIFICATION,
      at: [getSchedule(DEFAULT_NOTIFICATION.frequency)]
    })

    result = getNotification({ frequency: Frequency.MONTH })
    expect(result).toEqual({
      ...DEFAULT_NOTIFICATION,
      frequency: Frequency.MONTH,
      at: [getSchedule(Frequency.MONTH)]
    })
  })

  it('should create a new event', () => {
    let result = getEvent()

    const defaultExceptDate = omit(DEFAULT_EVENT, 'start')
    const exceptDate = omit(result, 'start')
    expect(exceptDate).toEqual({
      ...defaultExceptDate,
      active: true,
      notification: getNotification()
    })

    const start = new Date()
    result = getEvent({ start })
    expect(result).toEqual({
      ...DEFAULT_EVENT,
      start,
      active: true,
      notification: getNotification()
    })
  })
})
