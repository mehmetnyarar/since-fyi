import * as React from 'react'
import { act } from 'react-test-renderer'
import { render } from 'test/render'
import { App } from '~/app'

describe('App', () => {
  it('should render', async () => {
    const { queryByA11yLabel } = render(<App />)

    act(() => {
      expect(queryByA11yLabel(/since/i)).toBeTruthy()
    })
  })
})
