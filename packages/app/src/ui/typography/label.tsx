import React from 'react'
import { Typography, TypographyProps } from './typography'

/**
 * Label.
 * @props Props.
 * @returns <Label />.
 */
export const Label: React.FC<TypographyProps> = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>
}
