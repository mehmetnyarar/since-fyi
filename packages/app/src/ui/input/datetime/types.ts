import {
  AndroidNativeProps,
  IOSNativeProps
} from '@react-native-community/datetimepicker'
import { DateMode } from '~/utility'
import { PressableProps } from '../../button'
import { DialogProps } from '../../modal'

/**
 * DateTimePicker props.
 */
export type DateTimePickerProps = Omit<
  IOSNativeProps | AndroidNativeProps,
  'mode' | 'value' | 'onChange'
>

/**
 * DateTimeInput props.
 */
export interface DateTimeInputProps extends PressableProps {
  mode: DateMode
  value?: Date
  onChange: (value?: Date) => void
  dialogProps?: Partial<DialogProps>
  pickerProps?: Partial<DateTimePickerProps>
}
