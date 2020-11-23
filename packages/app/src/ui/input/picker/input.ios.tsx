import { Picker } from '@react-native-community/picker'
import React, { useCallback, useMemo, useState } from 'react'
import { useTheme } from '~/theme'
import { Pressable } from '../../button'
import { Dialog } from '../../modal'
import { PickerInputProps } from './types'

/**
 * PickerInput for IOS devices.
 * @param props Props.
 * @returns &lt;PickerInputIOS />.
 */
export const PickerInputIOS: React.FC<PickerInputProps> = props => {
  const { colors } = useTheme()
  const {
    selectLabel = '[Select]',
    options,
    value,
    onChange,
    dialogProps = {},
    pickerProps = {},
    ...pressableProps
  } = props

  const displayValue = useMemo(() => {
    return options.find(option => option.value === value)?.label
  }, [options, value])

  const [visible, setVisible] = useState(false)
  const toggleVisible = useCallback(() => setVisible(value => !value), [])

  const [selected, setSelected] = useState(value)
  const handleChange = useCallback((selectedValue: number | string) => {
    setSelected(selectedValue)
  }, [])

  // useEffect(() => {
  //   setSelected(value)
  // }, [value])

  const handleConfirm = useCallback(() => {
    setVisible(false)
    onChange(selected)
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
        text={displayValue || selectLabel}
        onPress={toggleVisible}
        accessible
        accessibilityRole='button'
        {...pressableProps}
      />
      {visible && (
        <Dialog
          visible={visible}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          {...dialogProps}
        >
          <Picker
            selectedValue={selected}
            onValueChange={handleChange}
            itemStyle={{ color: colors.text }}
            accessible
            accessibilityRole='spinbutton'
            {...pickerProps}
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
      )}
    </>
  )
}
