import { fireEvent } from '@testing-library/react-native'
import { renderScreen } from 'test/render'

describe('screens/event', () => {
  it('should render', async () => {
    const { getByA11yLabel, getAllByA11yLabel } = renderScreen('Main')

    const input = getByA11yLabel(/Enter an event title/)
    expect(input).toBeTruthy()
    fireEvent.changeText(input, 'New event')

    const action = getByA11yLabel(/Add event/)

    fireEvent.press(action)

    // FIXME There should not be to cancel buttons!
    // Figure out where it comes from

    const cancels = getAllByA11yLabel(/Cancel/)
    console.warn('cancels', cancels.length)

    // const goBack = getByA11yLabel(/Cancel/)
    // expect(goBack).toBeTruthy()

    // fireEvent.press(goBack)
    // input = getByA11yLabel(/Enter an event title/)
    // expect(input).toBeTruthy()
  })
})
