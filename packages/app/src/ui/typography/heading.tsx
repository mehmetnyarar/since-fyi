import React, { useMemo } from 'react'
import { Typography, TypographyProps } from './typography'

/**
 * &lt;Heading /> props.
 */
export interface HeadingProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

/**
 * Heading.
 * @props Props.
 * @returns &lt;Heading />.
 */
export const Heading: React.FC<HeadingProps> = props => {
  const { level = 2, children, ...typographyProps } = props
  const fontSize = useMemo(() => 32 - (level - 1) * 4, [level])

  return (
    <Typography fontSize={fontSize} fontWeight='bold' {...typographyProps}>
      {children}
    </Typography>
  )
}
