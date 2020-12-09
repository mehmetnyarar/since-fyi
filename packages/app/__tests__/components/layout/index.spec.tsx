import React from 'react'
import { Text } from 'react-native'
import { render } from 'test/render'
import { Layout } from '~/components/layout'

describe('components/layout', () => {
  it('should render', () => {
    const { getByA11yLabel, getByTestId } = render(
      <Layout>
        <Text testID='content'>Content</Text>
      </Layout>
    )

    expect(getByA11yLabel(/header/i)).toBeTruthy()
    expect(getByA11yLabel(/toolbar/i)).toBeTruthy()
    expect(getByTestId('content')).toBeTruthy()
  })
})
