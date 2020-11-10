import React from 'react'
import { Box, BoxProps } from '~/ui'

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
  // const { colors } = useTheme()

  return (
    <Box {...boxProps} flex={1} position='relative'>
      {children}
    </Box>
  )
}
