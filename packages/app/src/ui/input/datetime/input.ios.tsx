import Picker from '@react-native-community/datetimepicker'
import React, { useCallback, useMemo, useState } from 'react'
import { formatDate, getDateFormat } from '~/utility'
import { Pressable } from '../../button'
import { Dialog } from '../../modal'
import { DateTimeInputProps } from './types'

/**
 * DateTime input for iOS devices.
 * @param props Props.
 * @returns &lt;DateTimeInputIOS />.
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

  const [selected, setSelected] = useState(value)
  const handleChange = useCallback((_: unknown, value?: Date) => {
    setSelected(value)
  }, [])

  const as = useMemo(() => getDateFormat(mode), [mode])
  const formattedValue = useMemo(() => formatDate(value, as), [value, as])

  const [visible, setVisible] = useState(false)
  const toggleVisible = useCallback(() => setVisible(value => !value), [])

  const handleConfirm = useCallback(() => {
    onChange(selected)
    setVisible(false)
  }, [selected, onChange])
  const handleCancel = useCallback(() => {
    setSelected(value)
    setVisible(false)
  }, [value])

  return (
    <>
      <Pressable
        variant='basic'
        appearance='transparent'
        paddingHorizontal={16}
        borderRadius={4}
        text={formattedValue}
        onPress={toggleVisible}
        accessible
        accessibilityRole='button'
        {...pressableProps}
      />
      {visible && (
        <Dialog
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          {...dialogProps}
        >
          <Picker
            mode={mode as never}
            value={selected || new Date()}
            onChange={handleChange}
            accessible
            accessibilityRole='spinbutton'
            {...pickerProps}
          />
        </Dialog>
      )}
    </>
  )
}
