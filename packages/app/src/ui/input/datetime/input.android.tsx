import Picker from '@react-native-community/datetimepicker'
import React, { useCallback, useMemo, useState } from 'react'
import { formatDate, getDateFormat } from '~/utility'
import { Pressable } from '../../button'
import { DateTimeInputProps } from './types'

/**
 * DateTime input for Android devices.
 * @param props Props.
 * @returns <DateTimeInputAndroid />.
 */
export const DateTimeInputAndroid: React.FC<DateTimeInputProps> = props => {
  const { mode, value, onChange, pickerProps = {}, ...pressableProps } = props

  const [dateVisible, setDateVisible] = useState(false)
  const [timeVisible, setTimeVisible] = useState(false)
  const toggleVisible = useCallback(() => {
    if (mode.includes('date')) {
      setDateVisible(true)
    } else {
      setTimeVisible(true)
    }
  }, [mode])

  const [date, setDate] = useState(value)
  const handleDateChange = useCallback(
    (_: unknown, value?: Date) => {
      setDateVisible(false)

      if (value) setDate(value)
      if (value && mode.includes('time')) setTimeVisible(true)
      else onChange(value)
    },
    [mode, onChange]
  )
  const handleTimeChange = useCallback(
    (_: unknown, value?: Date) => {
      setTimeVisible(false)

      if (value) setDate(value)
      onChange(value)
    },
    [onChange]
  )

  const as = useMemo(() => getDateFormat(mode), [mode])
  const formattedValue = useMemo(() => formatDate(date, as), [date, as])

  return (
    <>
      <Pressable
        variant='basic'
        appearance='transparent'
        paddingHorizontal={16}
        text={formattedValue}
        onPress={toggleVisible}
        accessible
        accessibilityRole='button'
        {...pressableProps}
      />
      {dateVisible && (
        <Picker
          mode='date'
          value={date || new Date()}
          onChange={handleDateChange}
          accessible
          accessibilityRole='spinbutton'
          accessibilityLabel='Change the date'
          {...pickerProps}
        />
      )}
      {timeVisible && (
        <Picker
          mode='time'
          value={date || new Date()}
          onChange={handleTimeChange}
          accessible
          accessibilityRole='spinbutton'
          accessibilityLabel='Change the time'
          {...pickerProps}
        />
      )}
    </>
  )
}
