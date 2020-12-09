import { renderScreen } from 'test/render'

describe('screens/drawer/settings', () => {
  it('should render', async () => {
    const { findByA11yLabel, getByText } = renderScreen('Settings')

    const toolbar = await findByA11yLabel('toolbar')
    expect(toolbar).toHaveTextContent('settings')
    expect(getByText('language')).toBeTruthy()
  })
})
