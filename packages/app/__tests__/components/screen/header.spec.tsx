import { renderScreen } from 'test/render'
import { getHeight } from '~/components/screen/header'

describe('components/screen/header', () => {
  it('should determine the height', () => {
    expect(getHeight('ios')).toBe(96)
    expect(getHeight('android')).toBe(72)
    expect(getHeight('macos')).toBe(64)
  })

  it('should render', async () => {
    const { findByA11yLabel } = renderScreen('Main')

    expect(await findByA11yLabel('header')).toBeTruthy()
    expect(await findByA11yLabel('home')).toBeTruthy()
    expect(await findByA11yLabel('app.name')).toBeTruthy()
    expect(await findByA11yLabel('menu.toggle')).toBeTruthy()
  })
})
