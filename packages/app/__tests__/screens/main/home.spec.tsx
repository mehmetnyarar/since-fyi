import { renderScreen } from 'test/render'

describe('screens/home', () => {
  it('should render', async () => {
    const { findByA11yLabel } = renderScreen('Main')

    const input = await findByA11yLabel(/Enter an event title/)
    expect(input).toBeTruthy()
  })
})
