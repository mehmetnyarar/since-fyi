import React from 'react'
import { render } from 'test/render'
import { Row } from '~/components/row'
import { Typography } from '~/ui'

describe('components/row', () => {
  it('should render default', () => {
    const { getByText, toJSON } = render(
      <Row label='Label'>
        <Typography>Child</Typography>
      </Row>
    )
    expect(getByText('Label')).toBeTruthy()
    expect(getByText('Child')).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })

  it('should render without divider', () => {
    const { getByText, toJSON } = render(
      <Row label='Label' divider={false}>
        <Typography>Child</Typography>
      </Row>
    )
    expect(getByText('Label')).toBeTruthy()
    expect(getByText('Child')).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })
})
