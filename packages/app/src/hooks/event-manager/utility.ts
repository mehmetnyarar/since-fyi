import merge from 'lodash/merge'
import {
  DEFAULT_EVENT,
  DEFAULT_NOTIFICATION,
  DEFAULT_SCHEDULE,
  Event,
  Frequency,
  Notification,
  Schedule
} from '~/models'
import { ON_VISIBILITY } from './const'

/**
 * Creates a Schedule based on notification frequency.
 * @param frequency Frequency.
 * @param [value] Initial schedule.
 * @returns Schedule.
 */
export const getSchedule = (
  frequency: Frequency,
  value: Partial<Schedule> = {}
): Schedule => {
  return merge({}, DEFAULT_SCHEDULE, value, {
    on: Number(ON_VISIBILITY.includes(frequency))
  })
}

/**
 * Creates a Notification.
 * @param [value] Initial notification.
 * @returns Notification.
 */
export const getNotification = (
  value: Partial<Notification> = {}
): Notification => {
  const frequency = value.frequency || DEFAULT_NOTIFICATION.frequency
  return merge({}, DEFAULT_NOTIFICATION, value, {
    at: [getSchedule(frequency)]
  })
}

/**
 * Creates an Event.
 * @param [value] Initial event.
 * @returns Event.
 */
export const getEvent = (value: Partial<Event> = {}): Event => {
  const start = value.start || new Date()
  return merge({}, DEFAULT_EVENT, value, {
    start,
    active: true,
    notification: getNotification(value.notification)
  })
}
