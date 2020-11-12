import { renderScreen } from 'test/render'
import { getHeight } from '~/components/screen'

describe('components/screen/header', () => {
  it('should determine the height', () => {
    expect(getHeight('ios')).toBe(96)
    expect(getHeight('android')).toBe(72)
    expect(getHeight('macos')).toBe(64)
  })

  it('should render', () => {
    const { getByA11yLabel, getByTestId } = renderScreen()

    expect(getByA11yLabel(/header/i)).toBeTruthy()
    expect(getByA11yLabel(/since/i)).toBeTruthy()
    expect(getByTestId(/logo/i)).toBeTruthy()
  })
})
