import { Frequency } from '~/models'
import { EventManager } from './types'

/**
 * Default values for the EventManager.
 */
export const DEFAULT_EVENT_MANAGER: EventManager = {
  loading: undefined,
  result: undefined,
  error: undefined,
  set: () => {
    throw new Error('EventManager/set has not been implemented!')
  },
  load: () => {
    throw new Error('EventManager/load has not been implemented!')
  },
  clear: () => {
    throw new Error('EventManager/clear has not been implemented!')
  },
  select: () => {
    throw new Error('EventManager/select has not been implemented!')
  },
  current: undefined,
  create: () => {
    throw new Error('EventManager/create has not been implemented!')
  },
  update: () => {
    throw new Error('EventManager/update has not been implemented!')
  },
  remove: () => {
    throw new Error('EventManager/remove has not been implemented!')
  }
}

/**
 * Determines the visibility of {Notification.at}.
 */
export const AT_VISIBILITY = [Frequency.DAY, Frequency.WEEK, Frequency.MONTH]

/**
 * Determines the visibility of {Schedule.on}.
 */
export const ON_VISIBILITY = [Frequency.WEEK, Frequency.MONTH, Frequency.YEAR]
