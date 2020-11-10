import { Picker } from '@react-native-community/picker'
import { PickerProps } from '@react-native-community/picker/typings/Picker'
import React, { useCallback, useState } from 'react'
import { useTheme } from '~/theme'
import { SelectOption } from '~/types'
import { Pressable, PressableProps } from '../button'
import { Dialog, DialogProps } from '../modal'

/**
 * <PickerInput /> options.
 */
interface Props extends PressableProps {
  options: SelectOption[]
  value?: number | string
  onChange: (value?: number | string) => void
  dialogProps?: Partial<DialogProps>
  pickerProps?: Partial<PickerProps>
}

/**
 * PickerInput.
 * @param props Props.
 * @returns <PickerInput />.
 */
export const PickerInput: React.FC<Props> = props => {
  const { colors } = useTheme()
  const {
    options,
    value,
    onChange,
    dialogProps = {},
    pickerProps = {},
    ...pressableProps
  } = props

  const [visible, setVisible] = useState(false)
  const toggleVisible = useCallback(() => setVisible(value => !value), [])

  const [selected, setSelected] = useState(value)
  const handleChange = useCallback((selectedValue: number | string) => {
    setSelected(selectedValue)
  }, [])

  const handleConfirm = useCallback(() => {
    toggleVisible()
    onChange(selected)
  }, [selected, onChange, toggleVisible])

  return (
    <>
      <Pressable
        variant='basic'
        appearance='transparent'
        paddingHorizontal={16}
        {...pressableProps}
        text={String(value)}
        onPress={toggleVisible}
        accessible
        accessibilityRole='button'
      />
      <Dialog
        {...dialogProps}
        visible={visible}
        onConfirm={handleConfirm}
        onCancel={toggleVisible}
      >
        <Picker
          {...pickerProps}
          selectedValue={selected}
          onValueChange={handleChange}
          itemStyle={{ color: colors.text }}
          accessible
          accessibilityRole='spinbutton'
        >
          {options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </Dialog>
    </>
  )
}
