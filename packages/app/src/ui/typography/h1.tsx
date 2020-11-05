import React from 'react'
import { Typography, TypographyProps } from './typography'

/**
 * Headline 1.
 * @props Props.
 * @returns <H1 />.
 */
export const H1: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography fontSize={32} {...props}>
      {children}
    </Typography>
  )
}
