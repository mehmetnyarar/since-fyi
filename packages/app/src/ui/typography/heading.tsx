import React, { useMemo } from 'react'
import { Typography, TypographyProps } from './typography'

interface Props extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * Heading.
 * @props Props.
 * @returns <Heading />.
 */
export const Heading: React.FC<Props> = props => {
  const { level = 2, children, ...typographyProps } = props
  const fontSize = useMemo(() => 32 - (level - 1) * 4, [level])

  return (
    <Typography {...typographyProps} fontSize={fontSize} fontWeight='bold'>
      {children}
    </Typography>
  )
}
