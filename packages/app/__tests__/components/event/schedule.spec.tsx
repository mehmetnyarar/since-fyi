import React, { useMemo, useState } from 'react'
import { render } from 'test/render'
import { EventSchedule } from '~/components/event/schedule'
import { getDayOptions, getMonthOptions } from '~/hooks/event-form'
import { Frequency, getSchedule, Schedule } from '~/models'

// #region Setup

const date = new Date()

interface Props {
  frequency: Frequency
  onRemove?: () => void
}

const Component: React.FC<Props> = ({ frequency, onRemove }) => {
  const [schedule, setSchedule] = useState(getSchedule(date, frequency))
  const monthOptions = useMemo(() => getMonthOptions(frequency), [frequency])
  const dayOptions = useMemo(() => getDayOptions(frequency), [frequency])

  return (
    <EventSchedule
      monthOptions={monthOptions}
      dayOptions={dayOptions}
      value={schedule as Schedule}
      onChange={setSchedule}
      onRemove={onRemove}
    />
  )
}

// #endregion

describe('components/event/schedule', () => {
  it('should render', () => {
    const { getByA11yLabel, queryByA11yLabel } = render(
      <Component frequency={Frequency.DAY} />
    )

    const activeSwitch = getByA11yLabel('schedule.active.true')
    const monthOptionsButton = queryByA11yLabel('schedule.month')
    const dayOptionsButton = queryByA11yLabel('schedule.day')
    const timeButton = getByA11yLabel('schedule.time')

    expect(activeSwitch).toBeTruthy()
    expect(monthOptionsButton).toBeFalsy()
    expect(dayOptionsButton).toBeFalsy()
    expect(timeButton).toBeTruthy()
  })

  test.todo('Test other frequencies')
})
