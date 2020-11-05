import React from 'react'
import { Box, BoxProps } from './box'

/**
 * Horizontal box.
 * @param props Props.
 * @returns <HBox />.
 */
export const HBox: React.FC<BoxProps> = ({ children, ...boxProps }) => {
  return (
    <Box
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='center'
      {...boxProps}
    >
      {children}
    </Box>
  )
}
