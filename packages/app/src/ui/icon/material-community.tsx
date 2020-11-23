import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { getViewStyles, styled, ViewProps } from '~/theme'

type SafeViewProps = Omit<ViewProps, 'style'>

/**
 * &lt;Icon /> props.
 */
interface Props extends IconProps<never>, SafeViewProps {}

/**
 * Icon (Material Community).
 * @param props Props.
 * @returns &lt;Icon />.
 */
export const MaterialCommunityIcon = styled(MaterialCommunityIcons)<Props>`
  ${props => getViewStyles(props)}
`
