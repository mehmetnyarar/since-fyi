import { fireEvent, waitFor } from '@testing-library/react-native'
import { renderScreen } from 'test/render'

describe('components/screen/menu', () => {
  it('should toggle on/off the drawer', async () => {
    const { queryByA11yLabel, getByA11yLabel } = renderScreen('Main')

    // Should be invisible unless it's toggled on
    await waitFor(() => {
      expect(queryByA11yLabel('menu')).toBeFalsy()
    })

    // toggle on
    let menuButton = getByA11yLabel('menu.toggle.false')
    fireEvent.press(menuButton)
    await waitFor(() => {
      expect(queryByA11yLabel('menu')).toBeTruthy()
    })

    // toggle off
    menuButton = getByA11yLabel('menu.toggle.true')
    fireEvent.press(menuButton)
    await waitFor(() => {
      expect(queryByA11yLabel('menu')).toBeFalsy()
    })
  })
})
