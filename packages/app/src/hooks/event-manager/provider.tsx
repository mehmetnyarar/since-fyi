import React from 'react'
import { EventManagerContext } from './context'
import { useEventManager } from './use'

/**
 * EventManager provider.
 * @param props Props.
 */
export const EventManagerProvider: React.FC = ({ children }) => {
  const value = useEventManager()

  return (
    <EventManagerContext.Provider value={value}>
      {children}
    </EventManagerContext.Provider>
  )
}
