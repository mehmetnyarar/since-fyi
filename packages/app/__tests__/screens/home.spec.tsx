import { waitFor } from '@testing-library/react-native'
import { renderScreen } from 'test/render'
import { HomeScreen } from '~/screens/home'

describe('screens/home', () => {
  it('should render', async () => {
    const { getByText } = renderScreen(HomeScreen)

    await waitFor(() => {
      expect(getByText(/HomeScreen/i)).toBeTruthy()
    })
  })
})
