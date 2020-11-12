import Picker from '@react-native-community/datetimepicker'
import React, { useCallback, useMemo, useState } from 'react'
import { formatDate, getDateFormat } from '~/utility'
import { Pressable } from '../../button'
import { Dialog } from '../../modal'
import { DateTimeInputProps } from './types'

/**
 * DateTime input for iOS devices.
 * @param props Props.
 * @returns <DateTimeInputIOS />.
 */
export const DateTimeInputIOS: React.FC<DateTimeInputProps> = props => {
  const {
    mode,
    value,
    onChange,
    dialogProps = {},
    pickerProps = {},
    ...pressableProps
  } = props

  const [date, setDate] = useState(value)
  const handleChange = useCallback((_: unknown, value?: Date) => {
    setDate(value)
  }, [])

  const as = useMemo(() => getDateFormat(mode), [mode])
  const formattedValue = useMemo(() => formatDate(value, as), [value, as])

  const [visible, setVisible] = useState(false)
  const toggleVisible = useCallback(() => setVisible(value => !value), [])

  const handleConfirm = useCallback(() => {
    onChange(date)
    setVisible(false)
  }, [date, onChange])

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
      {visible && (
        <Dialog
          visible={visible}
          onConfirm={handleConfirm}
          onCancel={toggleVisible}
          {...dialogProps}
        >
          <Picker
            mode={mode as never}
            value={date || new Date()}
            onChange={handleChange}
            accessible
            accessibilityRole='spinbutton'
            accessibilityLabel='Change the date'
            {...pickerProps}
          />
        </Dialog>
      )}
    </>
  )
}
