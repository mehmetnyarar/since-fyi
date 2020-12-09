import { fireEvent } from '@testing-library/react-native'
import { renderScreen } from 'test/render'

describe('screens/main/home', () => {
  it('should render and redirect to the EventScreen', async () => {
    const { findByA11yLabel, findAllByA11yLabel } = renderScreen('Main')

    const titleInput = await findByA11yLabel('event.title')

    // Change title
    const title = 'New event'
    fireEvent.changeText(titleInput, title)

    // Create button should be visible now
    const createButton = await findByA11yLabel('event.create')
    expect(titleInput.props.value).toBe(title)
    expect(createButton).toBeTruthy()

    // Create event
    fireEvent.press(createButton)

    // The app should be redirected to the EventScreen
    const titleInputs = await findAllByA11yLabel('event.title')
    const upsertButton = await findByA11yLabel('event.create')
    expect(titleInputs).toHaveLength(2)
    expect(titleInputs[0].props.value).toBe('')
    expect(titleInputs[1].props.value).toBe(title)
    expect(upsertButton).toBeTruthy()
  })
})
