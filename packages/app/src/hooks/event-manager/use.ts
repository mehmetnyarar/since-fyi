import AsyncStorage from '@react-native-community/async-storage'
import { useCallback, useEffect, useState } from 'react'
import { Event } from '~/models'
import { ArrayUtils, getDate } from '~/utility'
import { EventManager } from './types'

/**
 * EventManager hook.
 */
export const useEventManager = (): EventManager => {
  const [loading, setLoading] = useState<boolean>()
  const [result, setResult] = useState<Event[]>()
  const [error, setError] = useState<string>()
  const [current, setCurrent] = useState<Event>()

  /**
   * Updates events.
   * @param events Events.
   */
  const set = useCallback(async (events: Event[] = []) => {
    await AsyncStorage.setItem('events', JSON.stringify(events))
    setResult(events)
  }, [])

  /**
   * Loads events.
   */
  const load = useCallback(async () => {
    try {
      setLoading(true)

      const data = await AsyncStorage.getItem('events')
      const parsed = data ? (JSON.parse(data) as Event[]) : []
      const _result = parsed.map<Event>(item => ({
        ...item,
        start: getDate(item.start),
        createdAt: getDate(item.createdAt),
        updatedAt: getDate(item.updatedAt)
      }))
      console.debug('load', {
        data,
        parsed,
        _result
      })
      setResult(_result)
    } catch (exception) {
      console.error('EventManager/load', { exception })
      setError('Failed to load events!')
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Removes all events.
   */
  const clear = useCallback(async () => {
    try {
      setLoading(true)
      await set([])
    } catch (exception) {
      console.error('EventManager/clear', { exception })
      setError('Failed to clear events!')
    } finally {
      setLoading(false)
    }
  }, [set])

  /**
   * Sets the current event.
   */
  const select = useCallback(
    (event?: string | Event) => {
      setCurrent(
        typeof event === 'string'
          ? result
              ? result.find(item => item.id === event)
              : undefined
          : event
      )
    },
    [result]
  )

  /**
   * Adds a new event.
   * @param event Event.
   */
  const create = useCallback(
    async (event: Event) => {
      if (!result) return

      try {
        setLoading(true)
        await set(result.concat(event))
      } catch (exception) {
        console.error('EventManager/create', { exception })
        setError('Failed to create event!')
      } finally {
        setLoading(false)
        setCurrent(event)
      }
    },
    [result, set]
  )

  /**
   * Updates the existing event.
   * @param event Event.
   */
  const update = useCallback(
    async (event: Event) => {
      if (!result) return

      const index = result.findIndex(e => e.id === event.id)
      if (index === -1) {
        setError(`Event does not exist! (@update: ${event.id})`)
        return
      }

      try {
        setLoading(true)
        await set(ArrayUtils.replace(result, index, event))
      } catch (exception) {
        console.error('EventManager/update', { exception })
        setError('Failed to update event!')
      } finally {
        setLoading(false)
      }
    },
    [result, set]
  )

  /**
   * Removes an event.
   * @param id Event ID.
   */
  const remove = useCallback(
    async (id: string) => {
      if (!result) return

      const index = result.findIndex(e => e.id === id)
      if (index === -1) {
        setError(`Event does not exist! (@remove: ${id})`)
        return
      }

      try {
        setLoading(true)
        await set(result.filter(e => e.id !== id))
      } catch (exception) {
        console.error('EventManager/remove', { exception })
        setError('Failed to remove event!')
      } finally {
        setLoading(false)
        setCurrent(undefined)
      }
    },
    [result, set]
  )

  useEffect(() => console.debug('EventManager/error', error), [error])
  useEffect(() => console.debug('EventManager/result', result), [result])
  useEffect(() => console.debug('EventManager/current', current), [current])

  return {
    loading,
    result,
    error,
    set,
    load,
    clear,
    select,
    current,
    create,
    update,
    remove
  }
}
