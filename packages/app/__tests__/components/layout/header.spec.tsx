import React from 'react'
import { render } from 'test/render'
import { Header } from '~/components/layout/header'

describe('components/layout/header', () => {
  it('should render', () => {
    const { getByA11yLabel } = render(<Header />)
    expect(getByA11yLabel(/since/i)).toBeTruthy()
  })
})
