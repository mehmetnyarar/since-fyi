import React from 'react'
import { Typography, TypographyProps } from './typography'

/**
 * Headline 2.
 * @props Props.
 * @returns <H2 />.
 */
export const H2: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography fontSize={28} {...props}>
      {children}
    </Typography>
  )
}
