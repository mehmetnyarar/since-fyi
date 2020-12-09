import { renderScreen } from 'test/render'

describe('screens/drawer/about', () => {
  it('should render', async () => {
    const { findByA11yLabel, getByText } = renderScreen('About')

    const toolbar = await findByA11yLabel('toolbar')
    expect(toolbar).toHaveTextContent('about')
    expect(getByText('app.description')).toBeTruthy()
    expect(getByText('app.version')).toBeTruthy()
  })
})
