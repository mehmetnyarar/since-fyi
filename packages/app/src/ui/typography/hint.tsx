import React from 'react'
import { Typography, TypographyProps } from './typography'

/**
 * Hint.
 * @props Props.
 * @returns <Hint />.
 */
export const Hint: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography {...props} variant='inverted' state='disabled'>
      {children}
    </Typography>
  )
}
