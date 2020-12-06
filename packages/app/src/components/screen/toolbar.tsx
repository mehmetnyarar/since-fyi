import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '~/theme'
import { GradientBox, GradientBoxProps } from '~/ui'

/**
 * &lt;Toolbar /> props.
 */
interface Props extends Partial<GradientBoxProps> {}

/**
 * Toolbar.
 * @param props Props.
 * @returns &lt;Toolbar />.
 */
export const Toolbar: React.FC<Props> = props => {
  const { children, ...gradientProps } = props
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <GradientBox
      colors={colors.toolbar.background}
      height={64}
      padding={16}
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='center'
      accessible
      accessibilityRole='toolbar'
      accessibilityLabel={t('toolbar')}
      {...gradientProps}
    >
      {children}
    </GradientBox>
  )
}
