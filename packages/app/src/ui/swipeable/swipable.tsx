import omit from 'lodash/omit'
import React, { ReactElement, useCallback, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import RNSwipeable, {
  SwipeableProperties
} from 'react-native-gesture-handler/Swipeable'
import { getViewStyles, styled } from '~/theme'
import { BoxProps, HBox } from '../box'
import { PressableProps } from '../button'
import { SwipeableRightAction } from './right-action'

type SafeBoxProps = Omit<BoxProps, 'hitSlop'>

/**
 * &lt;Swipeable /> props.
 */
export interface SwipeableProps extends SafeBoxProps, SwipeableProperties {
  isActive?: boolean
  rightActions?: ReactElement<PressableProps>[]
}

/**
 * Styled Swipeable.
 */
const Styled = styled(RNSwipeable)<SwipeableProps>`
  ${props => getViewStyles(omit(props, 'hitSlop'))}
`

/**
 * Swipeable.
 * @param props Props.
 * @returns &lt;Swipeable />.
 */
export const Swipeable: React.FC<SwipeableProps> = props => {
  const { isActive, rightActions, children, ...swipeableProps } = props
  const ref = useRef<RNSwipeable | null>(null)

  const renderRightActions = useCallback(
    (progress: Animated.AnimatedInterpolation) => {
      if (!rightActions) return null

      const width = rightActions.reduce((total, action) => {
        return total + Number(action.props.width) || 0
      }, 0)

      return (
        <HBox width={width}>
          {rightActions.map((action, index) => (
            <SwipeableRightAction
              key={index}
              progress={progress}
              {...action.props}
            />
          ))}
        </HBox>
      )
    },
    [rightActions]
  )

  useEffect(() => {
    if (!isActive) {
      ref.current?.close()
    }
  }, [isActive])

  return (
    <Styled
      ref={ref}
      isActive={isActive}
      renderRightActions={renderRightActions}
      {...swipeableProps}
    >
      {children}
    </Styled>
  )
}
