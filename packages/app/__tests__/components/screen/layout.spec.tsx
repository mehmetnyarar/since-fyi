import React from 'react'
import { Text } from 'react-native'
import { render } from 'test/render'
import { Layout } from '~/components/screen'

describe('components/screen/layout', () => {
  it('should render', () => {
    const { toJSON } = render(
      <Layout>
        <Text>Test</Text>
      </Layout>
    )

    expect(toJSON()?.children).toHaveLength(1)
  })
})
