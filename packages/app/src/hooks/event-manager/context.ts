import { createContext } from 'react'
import { DEFAULT_EVENT_MANAGER } from './const'
import { EventManager } from './types'

/**
 * EventManager context.
 */
const EventManagerContext = createContext<EventManager>(DEFAULT_EVENT_MANAGER)
EventManagerContext.displayName = 'EventManager'

export { EventManagerContext }
