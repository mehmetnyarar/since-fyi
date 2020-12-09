import React, { ReactElement, useState } from 'react'
import { BoxProps, VBox } from '../box'
import { SwipeableProps } from './swipable'

/**
 * &lt;SwipeableList /> props.
 */
export interface SwipeableListProps extends BoxProps {
  children: ReactElement<SwipeableProps>[]
}

/**
 * Swipeable list.
 * @param props Props.
 * @returns &lt;SwipeableList />.
 */
export const SwipeableList: React.FC<SwipeableListProps> = props => {
  const { children, ...boxProps } = props
  const [active, setActive] = useState<number>(-1)

  return (
    <VBox {...boxProps}>
      {children.map((swipeable, index) =>
        React.cloneElement<SwipeableProps>(swipeable, {
          key: index,
          isActive: index === active,
          onSwipeableOpen: () => setActive(index),
          onSwipeableClose: () => index === active && setActive(-1)
        })
      )}
    </VBox>
  )
}
