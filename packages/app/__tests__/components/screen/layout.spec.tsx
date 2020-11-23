import { renderScreen } from 'test/render'

describe('components/screen/layout', () => {
  it('should render', async () => {
    const { findByTestId } = renderScreen('Main')
    expect(await findByTestId('Layout')).toBeTruthy()
  })
})
