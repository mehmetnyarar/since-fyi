import React from 'react'
import { Platform } from 'react-native'
import { PickerInputAndroid } from './input.android'
import { PickerInputIOS } from './input.ios'
import { PickerInputProps } from './types'

/**
 * Picker input.
 * @param props Props.
 * @returns &lt;PickerInput />.
 */
export const PickerInput: React.FC<PickerInputProps> = props => {
  switch (Platform.OS) {
    case 'ios':
      return <PickerInputIOS {...props} />
    case 'android':
      return <PickerInputAndroid {...props} />
    default:
      return null
  }
}

export * from './types'
