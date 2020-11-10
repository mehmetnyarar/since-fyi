import React, { useCallback, useState } from 'react'
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps
} from 'react-native'
import { box, ElementState, styled, ViewProps } from '~/theme'
import { Typography } from '../typography'

/**
 * <Pressable /> props.
 */
export interface PressableProps extends ViewProps, RNPressableProps {
  text?: string
}

/**
 * Pressable.
 * @param props Props.
 * @returns <Pressable />.
 */
export const Styled = styled(RNPressable)<PressableProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${props => box(props)}
`

/**
 * Pressable button.
 * @param props Props.
 * @returns <PressableButton />.
 */
export const Pressable: React.FC<PressableProps> = props => {
  const { text, children, ...pressableProps } = props

  const [state, setState] = useState<ElementState>('default')
  const handlePressIn = useCallback(() => setState('active'), [])
  const handlePressOut = useCallback(() => setState('default'), [])

  return (
    <Styled
      state={state}
      height={48}
      borderRadius={4}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible
      accessibilityRole='button'
      {...pressableProps}
    >
      {text && <Typography state={state}>{text}</Typography>}
      {children}
    </Styled>
  )
}
