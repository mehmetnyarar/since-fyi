import React from 'react'
import { Typography, TypographyProps } from './typography'

/**
 * Headline 4.
 * @props Props.
 * @returns <H4 />.
 */
export const H4: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography fontSize={20} {...props}>
      {children}
    </Typography>
  )
}
