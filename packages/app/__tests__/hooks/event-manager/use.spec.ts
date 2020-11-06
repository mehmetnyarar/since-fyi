import { act, renderHook } from '@testing-library/react-hooks'
import { getEvent } from '~/hooks/event-manager'
import { useEventManager } from '~/hooks/event-manager/use'
import { Event } from '~/models'

const events: Event[] = [
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

    // load
    act(() => {
      result.current.load()
    })
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(0)

    // set
    act(() => {
      result.current.set(events)
    })
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(2)

    // select:item
    act(() => {
      result.current.select('2')
    })
    expect(result.current.current).toEqual(events[1])

    // select:none
    act(() => {
      result.current.select()
    })
    expect(result.current.current).toBeUndefined()

    // create
    act(() => {
      result.current.create(getEvent({ id: '3', title: 'Event 3' }))
    })
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(3)

    // update
    act(() => {
      result.current.update(getEvent({ id: '3', title: 'Event 3 Updated' }))
    })
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(3)
    expect(result.current.result?.[2].title).toBe('Event 3 Updated')

    // update:failure
    act(() => {
      result.current.update(getEvent({ id: '5', title: 'Event 5 Updated' }))
    })
    expect(result.current.error).toMatch(/@update/)

    // remove
    act(() => {
      result.current.remove('1')
    })
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(2)

    // remove:failure
    act(() => {
      result.current.remove('5')
    })
    expect(result.current.error).toMatch(/@remove/)

    // clear
    act(() => {
      result.current.clear()
    })
    await waitForNextUpdate()
    expect(result.current.result).toHaveLength(0)
  })
})
