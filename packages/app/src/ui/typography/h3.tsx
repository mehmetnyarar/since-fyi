import React from 'react'
import { Typography, TypographyProps } from './typography'

/**
 * Headline 3.
 * @props Props.
 * @returns <H3 />.
 */
export const H3: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography fontSize={24} {...props}>
      {children}
    </Typography>
  )
}
