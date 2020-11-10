import React from 'react'
import { Platform } from 'react-native'
import { DateTimeInputAndroid } from './input.android'
import { DateTimeInputIOS } from './input.ios'
import { DateTimeInputProps } from './types'

/**
 * DateTime input.
 * @param props Props.
 * @returns <DateTimeInput />.
 */
export const DateTimeInput: React.FC<DateTimeInputProps> = props => {
  switch (Platform.OS) {
    case 'ios':
      return <DateTimeInputIOS {...props} />
    case 'android':
      return <DateTimeInputAndroid {...props} />
    default:
      return null
  }
}
