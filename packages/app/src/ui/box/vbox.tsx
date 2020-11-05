import React from 'react'
import { Box, BoxProps } from './box'

/**
 * Vertical box.
 * @param props Props.
 * @returns <VBox />.
 */
export const VBox: React.FC<BoxProps> = ({ children, ...boxProps }) => {
  return (
    <Box
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='stretch'
      {...boxProps}
    >
      {children}
    </Box>
  )
}
