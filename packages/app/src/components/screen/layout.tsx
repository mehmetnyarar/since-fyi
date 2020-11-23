import React, { ReactNode } from 'react'
import { useTheme } from '~/theme'
import { BoxProps, Heading, VBox } from '~/ui'
import { Header } from './header'
import { Toolbar } from './toolbar'

/**
 * &lt;Layout /> props.
 */
interface Props extends BoxProps {
  title?: string
  toolbarContent?: string | ReactNode
}

/**
 * Screen layout.
 * @param props Props.
 * @returns &lt;Layout />.
 */
export const Layout: React.FC<Props> = props => {
  const { title, children, ...boxProps } = props
  const { colors } = useTheme()

  return (
    <VBox flex={1} position='relative' testID='Layout'>
      <Header />
      {title && (
        <Toolbar justifyContent='center'>
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
