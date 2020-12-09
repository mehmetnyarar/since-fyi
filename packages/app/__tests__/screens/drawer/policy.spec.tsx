import { renderScreen } from 'test/render'
import { PolicyType } from '~/navigation'

describe('screens/drawer/policy', () => {
  it('should render', async () => {
    const type: PolicyType = 'privacy'
    const { findByA11yLabel, getByText } = renderScreen('Policy', {
      type
    })

    const toolbar = await findByA11yLabel('toolbar')
    expect(toolbar).toHaveTextContent(`policy.${type}`)
    expect(getByText(type)).toBeTruthy()
  })
})
