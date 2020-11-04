import { renderScreen } from 'test/render'
import { EventScreen } from '~/screens/event'

describe('screens/event', () => {
  it('should render', () => {
    const { getByText } = renderScreen(EventScreen)
    expect(getByText(/eventscreen/i)).toBeTruthy()
  })
})
