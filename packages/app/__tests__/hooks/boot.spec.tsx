import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { useBoot } from '~/hooks/boot'
import { EventManagerProvider } from '~/hooks/event-manager'

describe('hooks/boot', () => {
  it('should render', async () => {
    const Wrapper: React.FC = ({ children }) => (
      <EventManagerProvider>{children}</EventManagerProvider>
    )

    const { result, waitForNextUpdate } = renderHook(() => useBoot(), {
      wrapper: Wrapper
    })

    await waitForNextUpdate()
    expect(result.current).toEqual({
      isReady: true
    })
  })
})
