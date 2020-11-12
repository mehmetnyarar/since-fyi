import React from 'react'
import { useTheme } from '~/theme'
import { BoxProps, Heading, VBox } from '~/ui'
import { Toolbar } from './toolbar'

/**
 * <Layout /> props.
 */
interface Props extends BoxProps {
  title?: string
}

/**
 * Screen layout.
 * @param props Props.
 * @returns <ScreenLayout />.
 */
export const Layout: React.FC<Props> = props => {
  const { colors } = useTheme()
  const { title, children, ...boxProps } = props

  return (
    <VBox flex={1} position='relative'>
      {title && (
        <Toolbar>
          <Heading level={2} fontSize={16} color={colors.header.text}>
            {title}
          </Heading>
        </Toolbar>
      )}
      <VBox flex={1} {...boxProps}>
        {children}
      </VBox>
    </VBox>
  )
}
