import { fireEvent } from '@testing-library/react-native'
import React, { useState } from 'react'
import { render } from 'test/render'
import { EventReminder } from '~/components/event/reminder'
import { getReminder } from '~/models'

// #region Setup

const date = new Date()
const reminder = getReminder(date, { preset: 'DAY.1' })

const Component: React.FC = () => {
  const [value, setValue] = useState(reminder)
  return <EventReminder date={date} value={value} onChange={setValue} />
}

beforeEach(() => {
  jest.resetAllMocks()
})

// #endregion

describe('components/event/reminder', () => {
  it('should render', async () => {
    const { getByA11yLabel } = render(<Component />)

    const preset = getByA11yLabel('reminder.preset')
    const frequency = getByA11yLabel('reminder.frequency')
    const every = getByA11yLabel('reminder.every')
    const schedules = getByA11yLabel('schedules')

    expect(preset.children[0]).toHaveTextContent('PRESET.DAY.1')
    expect(frequency.children[0]).toHaveTextContent('FREQUENCY.DAY')
    expect(every.children[0]).toHaveTextContent('1')
    expect(schedules.children).toHaveLength(1)
  })

  it('should pick a new preset', async () => {
    const { getByA11yLabel, findByA11yLabel } = render(<Component />)

    let preset = getByA11yLabel('reminder.preset')

    // Show picker dialog
    fireEvent.press(preset)

    const picker = await findByA11yLabel('reminder.preset.pick')
    expect(picker.props.selectedValue).toBe('DAY.1')

    // Change the preset
    fireEvent(picker, 'onValueChange', 'WEEK.2')
    expect(picker.props.selectedValue).toBe('WEEK.2')

    // Confirm
    const confirm = await findByA11yLabel('confirm')
    fireEvent.press(confirm)

    preset = await findByA11yLabel('reminder.preset')
    const frequency = await findByA11yLabel('reminder.frequency')
    const every = await findByA11yLabel('reminder.every')
    const schedules = await findByA11yLabel('schedules')
    expect(preset.children[0]).toHaveTextContent('PRESET.WEEK.2')
    expect(frequency.children[0]).toHaveTextContent('FREQUENCY.WEEK')
    expect(every.children[0]).toHaveTextContent('2')
    expect(schedules.children).toHaveLength(1)
  })

  test.todo('Test more presets')
  test.todo('Test adding and removing schedules')
})
