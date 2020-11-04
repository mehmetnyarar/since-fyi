import { renderHook } from '@testing-library/react-hooks'
import { useBoot } from '~/hooks/boot'

describe('hooks/boot', () => {
  it('should render', () => {
    const { result } = renderHook(() => useBoot())

    expect(result.current).toEqual({
      isReady: true
    })
  })
})
