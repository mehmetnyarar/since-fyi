import { PickerProps } from '@react-native-community/picker/typings/Picker'
import { PressableProps } from '../../button'
import { DialogProps } from '../../modal'
import { SelectOption } from '../types'

/**
 * &lt;PickerInput /> props.
 */
export interface PickerInputProps extends PressableProps {
  options: SelectOption[]
  value?: string | number
  onChange: (value?: string | number) => void
  selectLabel?: string
  dialogProps?: Partial<DialogProps>
  pickerProps?: Partial<PickerProps>
}
