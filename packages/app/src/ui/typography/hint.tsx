import React from 'react'
import { useTheme } from '~/theme'
import { Typography, TypographyProps } from './typography'

/**
 * Hint.
 * @props Props.
 * @returns &lt;Hint />.
 */
export const Hint: React.FC<TypographyProps> = ({ children, ...props }) => {
  const { colors } = useTheme()

  return (
    <Typography {...props} fontSize={10} color={colors.hint}>
      {children}
    </Typography>
  )
}
