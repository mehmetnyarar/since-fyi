import { renderScreen } from 'test/render'
import { EventScreen } from '~/screens/event'
import { HomeScreen } from '~/screens/home'

describe('screens/home', () => {
  it('should render', async () => {
    const { findByA11yLabel } = renderScreen({
      main: { name: 'Home', component: HomeScreen },
      next: { name: 'Event', component: EventScreen }
    })

    const input = await findByA11yLabel(/Enter an event title/)
    expect(input).toBeTruthy()
  })
})
