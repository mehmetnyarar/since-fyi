import React, { useEffect } from 'react'
import { Animated } from 'react-native'
import { Pressable, PressableProps } from '../button'

/**
 * &lt;SwipeableRightAction /> props.
 */
export interface SwipeableRightActionProps extends PressableProps {
  x?: number
  progress: Animated.AnimatedInterpolation
}

/**
 * Action that appears on the right side of the Swipeable.
 * @param props Props.
 * @returns &lt;SwipeableRightAction />.
 */
export const SwipeableRightAction: React.FC<SwipeableRightActionProps> = props => {
  const { x = Number(props.width), progress, ...pressableProps } = props

  useEffect(() => {
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    })
  }, [progress, x])

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
      <Pressable {...pressableProps} />
    </Animated.View>
  )
}
