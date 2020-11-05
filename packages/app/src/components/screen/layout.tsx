import React from 'react'
import { Box, BoxProps } from '~/ui/box'

/**
 * <Layout /> props.
 */
interface Props extends BoxProps {}

/**
 * Screen layout.
 * @param props Props.
 * @returns <ScreenLayout />.
 */
export const Layout: React.FC<Props> = ({ children, ...boxProps }) => {
  return <Box {...boxProps}>{children}</Box>
}
