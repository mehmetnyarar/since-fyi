import omit from 'lodash/omit'
import React, { useCallback, useState } from 'react'
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps
} from 'react-native'
import {
  ElementState,
  getViewStyles,
  styled,
  TextProps,
  ViewProps
} from '~/theme'
import { Typography } from '../typography'

type SafeViewProps = Omit<ViewProps, 'style' | 'hitSlop'>
type SafeTextProps = Omit<TextProps, 'style' | 'onPress' | 'onLongPress'>

/**
 * &lt;Pressable /> props.
 */
export interface PressableProps
  extends RNPressableProps,
    SafeViewProps,
    SafeTextProps {
  text?: string
}

/**
 * Pressable.
 * @param props Props.
 * @returns &lt;Pressable />.
 */
const Styled = styled(RNPressable)<PressableProps>`
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${props =>
    getViewStyles(omit(props, ['hitSlop', 'onPress', 'onLongPress', 'style']))}
`

/**
 * Pressable.
 * @param props Props.
 * @returns &lt;Pressable />.
 */
export const Pressable: React.FC<PressableProps> = props => {
  const {
    text,
    children,
    color,
    fontSize,
    fontStyle,
    fontWeight,
    textAlign,
    ...pressableProps
  } = props

  const [state, setState] = useState<ElementState>('default')
  const handlePressIn = useCallback(() => setState('active'), [])
  const handlePressOut = useCallback(() => setState('default'), [])

  return (
    <Styled
      state={state}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible
      accessibilityRole='button'
      {...pressableProps}
    >
      {children}
      {Boolean(text) && (
        <Typography
          state={state}
          color={color}
          fontSize={fontSize}
          fontStyle={fontStyle}
          fontWeight={fontWeight}
          textAlign={textAlign}
        >
          {text}
        </Typography>
      )}
    </Styled>
  )
}
