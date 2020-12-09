import React from 'react'
import { Typography, TypographyProps } from './typography'

/**
 * Paragraph.
 * @props Props.
 * @returns &lt;P />.
 */
export const P: React.FC<TypographyProps> = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>
}
