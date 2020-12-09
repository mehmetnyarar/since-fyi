import { EventManager } from './types'

const notImplemented = (fn: string) => () => {
  throw new Error(`EventManager/${fn} is not implemented.`)
}

/**
 * Default values for the EventManager.
 */
export const DEFAULT_EVENT_MANAGER: EventManager = {
  loading: undefined,
  result: undefined,
  error: undefined,
  set: notImplemented('set'),
  load: notImplemented('load'),
  clear: notImplemented('clear'),
  select: notImplemented('select'),
  current: undefined,
  create: notImplemented('create'),
  update: notImplemented('update'),
  remove: notImplemented('remove')
}
