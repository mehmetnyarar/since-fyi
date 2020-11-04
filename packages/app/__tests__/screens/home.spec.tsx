import { renderScreen } from 'test/render'
import { HomeScreen } from '~/screens/home'

describe('screens/home', () => {
  it('should render', () => {
    const { getByText } = renderScreen(HomeScreen)
    expect(getByText(/homescreen/i)).toBeTruthy()
  })
})
