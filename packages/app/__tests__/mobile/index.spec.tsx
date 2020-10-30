import { render } from '@testing-library/react-native'
import { App } from '~/app'
import * as React from 'react'

describe('index', () => {
  it('should render', () => {
    const { queryByText } = render(<App />)
    expect(queryByText(/app/)).toBeTruthy()
  })
})
