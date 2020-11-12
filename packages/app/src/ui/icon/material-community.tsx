import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { box, styled, ViewProps } from '~/theme'

/**
 * <Icon /> props.
 */
interface Props extends IconProps<never>, ViewProps {}

/**
 * Icon (Material Community).
 * @param props Props.
 * @returns <Icon />.
 */
export const MaterialCommunityIcon = styled(MaterialCommunityIcons)<Props>`
  ${props => box(props)}
`
