import { fireEvent } from '@testing-library/react-native'
import { renderScreen } from 'test/render'
import { EventScreen } from '~/screens/event'
import { HomeScreen } from '~/screens/home'

describe('screens/event', () => {
  it('should render', async () => {
    const { findByText } = renderScreen({
      main: { name: 'Home', component: HomeScreen },
      next: { name: 'Event', component: EventScreen }
    })

    let button = await findByText(/Go to/)
    expect(button).toBeTruthy()
    fireEvent(button, 'onPress')

    button = await findByText(/Go back/)
    expect(button).toBeTruthy()
    fireEvent(button, 'onPress')

    button = await findByText(/Go to/)
    expect(button).toBeTruthy()
  })
})
