import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { Platform } from 'react-native'
import { render } from 'test/render'
import { EventUpdate } from '~/components/event'

describe('components/event/update', () => {
  it('should render on ios for the default event', () => {
    Platform.OS = 'ios'

    const onFinish = jest.fn()
    const { getByA11yLabel, getAllByA11yLabel, getByTestId } = render(
      <EventUpdate onFinish={onFinish} />
    )

    const confirms = getAllByA11yLabel(/Confirm/)
    expect(confirms).toHaveLength(3)

    const cancels = getAllByA11yLabel(/Cancel/)
    expect(cancels).toHaveLength(3)

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
    const startDialog = getByA11yLabel(/Start Date/)
    const startConfirm = confirms[0]
    expect(startDialog.props.visible).toBeFalsy()
    fireEvent.press(startTrigger)
    expect(startDialog.props.visible).toBeTruthy()
    fireEvent.press(startConfirm)
    expect(startDialog.props.visible).toBeFalsy()

    const notificationActive = getByA11yLabel(/Enable or disable notifications/)
    fireEvent(notificationActive, 'onValueChange', true)
    expect(notificationActive.props.value).toBeTruthy()
    expect(notificationSettings.props.hidden).toBeFalsy()
  })
})
