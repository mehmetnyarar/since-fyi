import { act, renderHook } from '@testing-library/react-hooks'
import { useEventManager } from '~/hooks/event-manager/use'
import { getEvent } from '~/models'

const events = [
  getEvent({ id: '1', title: 'Event 1' }),
  getEvent({ id: '2', title: 'Event 2' })
]

describe('hooks/event-manager/use', () => {
  it('should render', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEventManager())

    expect(result.current.loading).toBeUndefined()
    expect(result.current.result).toBeUndefined()
    expect(result.current.error).toBeUndefined()
    expect(result.current.current).toBeUndefined()

    // Load events
    act(() => result.current.load())
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(0)

    // Set events
    act(() => result.current.set(events))
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(2)

    // Set the current event
    act(() => result.current.select('2'))
    expect(result.current.current).toEqual(events[1])

    // Deselect the current event
    act(() => result.current.select())
    expect(result.current.current).toBeUndefined()

    // Create a new event
    let event = getEvent({ id: '3', title: 'Event 3' })
    act(() => result.current.create(event))
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(3)

    // Update an event
    event = getEvent({ id: '3', title: 'Event 3 Updated' })
    act(() => result.current.update(event))
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(3)
    expect(result.current.result?.[2].title).toBe('Event 3 Updated')

    // Simulate update failure
    event = getEvent({ id: '5', title: 'Event 5 Updated' })
    act(() => result.current.update(event))
    expect(result.current.error).toMatch(/@update/)

    // Remove an event
    act(() => result.current.remove('1'))
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(2)

    // Simulate update failure
    act(() => result.current.remove('5'))
    expect(result.current.error).toMatch(/@remove/)

    // Remove all events
    act(() => result.current.clear())
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(0)
  })
})
