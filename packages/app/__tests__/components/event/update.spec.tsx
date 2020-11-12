import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { Platform } from 'react-native'
import { render } from 'test/render'
import { EventUpsert } from '~/components/event/upsert'

describe('components/event/update', () => {
  it('should render on ios for the default event', () => {
    Platform.OS = 'ios'

    const onFinish = jest.fn()
    const { getByA11yLabel, queryByA11yLabel, getByTestId } = render(
      <EventUpsert onFinish={onFinish} />
    )

    const eventSettings = getByTestId('event-settings')
    expect(eventSettings.props.hidden).toBeTruthy()

    const notificationSettings = getByTestId('notification-settings')
    expect(notificationSettings.props.hidden).toBeTruthy()

    const scheduleSettings = getByTestId('schedule-settings')
    expect(scheduleSettings.props.hidden).toBeTruthy()

    const eventActive = getByA11yLabel(/Pause or activate event/)
    fireEvent(eventActive, 'onValueChange', true)
    expect(eventActive.props.value).toBeTruthy()
    expect(eventSettings.props.hidden).toBeFalsy()

    const startTrigger = getByA11yLabel(/Change the start date/)

    fireEvent.press(startTrigger)
    expect(getByA11yLabel(/Start Date/)).toBeTruthy()
    const startConfirm = getByA11yLabel(/Confirm/)

    fireEvent.press(startConfirm)
    expect(queryByA11yLabel(/Start Date/)).toBeFalsy()
    expect(queryByA11yLabel(/Confirm/)).toBeFalsy()

    const notificationActive = getByA11yLabel(/Enable or disable notifications/)
    fireEvent(notificationActive, 'onValueChange', true)
    expect(notificationActive.props.value).toBeTruthy()
    expect(notificationSettings.props.hidden).toBeFalsy()
  })

  test.todo('Create a test that renders for android')
})
