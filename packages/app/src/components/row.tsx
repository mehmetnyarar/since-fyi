import React from 'react'
import { useTheme } from '~/theme'
import { BoxProps, Divider, HBox, Label } from '~/ui'

/**
 * &lt;Row /> props.
 */
export interface RowProps extends BoxProps {
  label: string
  divider?: boolean
}

/**
 * Row.
 * @param props Props.
 * @returns &lt;Row />.
 */
export const Row: React.FC<RowProps> = props => {
  const { label, divider = true, children, ...boxProps } = props
  const { colors } = useTheme()

  return (
    <>
      <HBox
        padding={16}
        backgroundColor={colors.card}
        justifyContent='space-between'
        {...boxProps}
      >
        <Label>{label}</Label>
        {children}
      </HBox>
      {divider && <Divider />}
    </>
  )
}
