import { fireEvent } from '@testing-library/react-native'
import { renderScreen } from 'test/render'

describe('screens/main/event', () => {
  it('should render and redirect to the MainScreen', async () => {
    const { findByA11yLabel, findAllByA11yLabel } = renderScreen('Main')

    let titleInput = await findByA11yLabel('event.title')

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
    const upsertButton = await findByA11yLabel('event.upsert')
    const cancelButton = await findByA11yLabel('event.upsert.cancel')
    expect(titleInputs).toHaveLength(2)
    expect(titleInputs[0].props.value).toBe('')
    expect(titleInputs[1].props.value).toBe(title)
    expect(upsertButton).toBeTruthy()

    // Cancel
    fireEvent.press(cancelButton)

    // The app should be redirected to the MainScreen
    titleInput = await findByA11yLabel('event.title')
    expect(titleInput).toBeTruthy()
  })
})
