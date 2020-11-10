import { fireEvent } from '@testing-library/react-native'
import { renderScreen } from 'test/render'
import { EventScreen } from '~/screens/event'
import { HomeScreen } from '~/screens/home'

describe('screens/event', () => {
  it('should render', async () => {
    const { getByA11yLabel, findByA11yLabel } = renderScreen({
      main: { name: 'Home', component: HomeScreen },
      next: { name: 'Event', component: EventScreen }
    })

    let input = getByA11yLabel(/Enter an event title/)
    expect(input).toBeTruthy()
    fireEvent.changeText(input, 'New event')

    const action = getByA11yLabel(/Add event/)

    fireEvent.press(action)
    const goBack = await findByA11yLabel(/Cancel/)
    expect(goBack).toBeTruthy()

    fireEvent.press(goBack)
    input = getByA11yLabel(/Enter an event title/)
    expect(input).toBeTruthy()
  })
})
