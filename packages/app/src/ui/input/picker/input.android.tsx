import React, { useCallback, useMemo, useState } from 'react'
import { Pressable } from '../../button'
import { Dialog } from '../../modal'
import { Picker, PickerItem } from './picker'
import { PickerInputProps } from './types'

/**
 * PickerInput for Android devices.
 * @param props Props.
 * @returns &lt;PickerInputAndroid />.
 */
export const PickerInputAndroid: React.FC<PickerInputProps> = props => {
  const {
    selectLabel = '[Select]',
    options,
    value,
    onChange,
    dialogProps = {},
    pickerProps = {},
    maxHeight = 200,
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
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          {...dialogProps}
        >
          <Picker
            maxHeight={maxHeight}
            selectedValue={selected}
            onValueChange={handleChange}
            accessible
            accessibilityRole='spinbutton'
            {...pickerProps}
          >
            {options.map((option, index) => (
              <PickerItem
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
