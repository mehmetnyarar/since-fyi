import React from 'react'
import { render } from 'test/render'
import { getHeight, Header } from '~/components/screen'

describe('components/screen/header', () => {
  it('should determine the height', () => {
    expect(getHeight('ios')).toBe(96)
    expect(getHeight('android')).toBe(72)
    expect(getHeight('macos')).toBe(64)
  })

  it('should render', () => {
    const { debug, toJSON } = render(<Header />)
    debug()

    const json = toJSON()
    expect(json?.children).toHaveLength(2)
  })
})
