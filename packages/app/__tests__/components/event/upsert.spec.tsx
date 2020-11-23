import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { render } from 'test/render'
import { EventUpsert } from '~/components/event/upsert'
import { getEvent } from '~/models'
import { DateFormat, formatDate } from '~/utility'

// #region Setup

const getDate = (date?: Date) => formatDate(date, DateFormat.dmyhm)

const event = getEvent({ title: 'Event' })
const handleSuccess = jest.fn()
const handleCancel = jest.fn()
const startDate = getDate(event.start)

const setup = () => {
  return render(
    <EventUpsert
      event={event}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  )
}

// #endregion

describe('components/event/upsert', () => {
  it('should render', () => {
    const { getByA11yLabel } = setup()
    const eventActive = getByA11yLabel('event.active')
    const eventSettings = getByA11yLabel('event.settings')
    const eventStart = getByA11yLabel('event.start')
    const reminderActive = getByA11yLabel('reminder.active')
    const reminderSettings = getByA11yLabel('reminder.settings')

    expect(eventActive.props.value).toBeTruthy()
    expect(eventSettings.props.hidden).toBeFalsy()
    expect(eventStart.children[0]).toHaveTextContent(startDate)
    expect(reminderActive.props.value).toBeFalsy()
    expect(reminderSettings.props.hidden).toBeTruthy()
  })

  it('should deactive the event', () => {
    const { getByA11yLabel } = setup()
    const eventActive = getByA11yLabel('event.active')
    const eventSettings = getByA11yLabel('event.settings')

    fireEvent(eventActive, 'onValueChange', false)
    expect(eventActive.props.value).toBeFalsy()
    expect(eventSettings.props.hidden).toBeTruthy()
  })

  it('should pick a start date on iOS', async () => {
    const { getByA11yLabel, findByA11yLabel } = setup()
    const eventStart = getByA11yLabel('event.start')

    const date = new Date()
    const newStartDate = getDate(date)

    // Show dialog
    fireEvent.press(eventStart)

    const picker = await findByA11yLabel('event.start.pick')
    expect(picker.props.value).toEqual(event.start)

    // Pick a date
    fireEvent(picker, 'onChange', null, date)

    // Confirm
    const confirm = await findByA11yLabel('dialog.confirm')
    fireEvent.press(confirm)
    expect(eventStart.children[0]).toHaveTextContent(newStartDate)
  })

  it('should pick a start date on Android', async () => {
    const { getByA11yLabel, findByA11yLabel } = setup()
    const eventStart = getByA11yLabel('event.start')

    const date = new Date()
    const newStartDate = getDate(date)

    // Show dialog
    fireEvent.press(eventStart)

    const picker = await findByA11yLabel('event.start.pick')
    expect(picker.props.value).toEqual(event.start)

    // Pick a date and time
    fireEvent(picker, 'onChange', null, date)
    fireEvent(picker, 'onChange', null, date)

    // Confirm
    const confirm = await findByA11yLabel('dialog.confirm')
    fireEvent.press(confirm)
    expect(eventStart.children[0]).toHaveTextContent(newStartDate)
  })

  it('should active the reminder', () => {
    const { getByA11yLabel } = setup()
    const reminderActive = getByA11yLabel('reminder.active')
    const reminderSettings = getByA11yLabel('reminder.settings')

    fireEvent(reminderActive, 'onValueChange', true)
    expect(reminderActive.props.value).toBe(true)
    expect(reminderSettings.props.hidden).toBeFalsy()
  })
})
