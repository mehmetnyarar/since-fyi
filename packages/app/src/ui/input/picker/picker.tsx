import {
  PickerItemProps as RNPickerItemProps,
  PickerProps as RNPickerProps
} from '@react-native-community/picker/typings/Picker'
import React, { ReactElement, useCallback, useRef } from 'react'
import { LayoutChangeEvent, ScrollView } from 'react-native'
import { ScrollBox, ScrollBoxProps } from '../../box'
import { Pressable, PressableProps } from '../../button'

type SafePressableProps = Omit<PressableProps, 'color'>

/**
 * &lt;PickerItem /> props.
 */
interface PickerItemProps extends SafePressableProps, RNPickerItemProps {
  isSelected?: boolean
}

/**
 * Picker item.
 * @param props Props.
 * @returns &lt;PickerItem />.
 */
export const PickerItem: React.FC<PickerItemProps> = props => {
  const { label = '[PickerItem]', ...pressableProps } = props
  return (
    <Pressable
      text={label}
      variant='basic'
      appearance='transparent'
      {...pressableProps}
    />
  )
}

type SafeScrollBoxProps = Omit<ScrollBoxProps, 'style'>

/**
 * &lt;Picker /> props.
 */
interface PickerProps extends SafeScrollBoxProps, RNPickerProps {
  children: ReactElement<PickerItemProps>[]
}

/**
 * Picker.
 * @param props Props.
 * @returns &lt;Picker />.
 */
export const Picker: React.FC<PickerProps> = props => {
  const { selectedValue, onValueChange, children, ...boxProps } = props

  const ref = useRef<ScrollView>()
  const handleItemLayout = useCallback((e: LayoutChangeEvent) => {
    const { x, y } = e.nativeEvent.layout
    ref.current?.scrollTo({ x, y, animated: true })
  }, [])

  const Options = children.map((Option, index) => {
    const isSelected = Option.props.value === selectedValue
    return React.cloneElement<PickerItemProps>(Option, {
      ...Option.props,
      isSelected,
      state: isSelected ? 'active' : undefined,
      onPress: () =>
        onValueChange ? onValueChange(Option.props.value, index) : undefined,
      onLayout: e => (isSelected ? handleItemLayout(e) : undefined)
    })
  })

  return (
    <ScrollBox ref={ref as never} {...boxProps}>
      {Options}
    </ScrollBox>
  )
}
