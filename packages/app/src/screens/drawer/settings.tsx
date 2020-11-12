import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '~/components/i18n'
import { Layout } from '~/components/screen'
import { DrawerNavigationParams } from '~/navigation'
import { useTheme } from '~/theme'
import { Divider, HBox, Label } from '~/ui'

/**
 * <SettingsScreen /> props.
 */
interface Props {
  route: RouteProp<DrawerNavigationParams, 'Settings'>
  navigation: DrawerNavigationProp<DrawerNavigationParams, 'Settings'>
}

/**
 * Application settings.
 * @param props Props.
 * @returns <SettingsScreen />.
 */
export const SettingsScreen: React.FC<Props> = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <Layout title={t('settings')}>
      <HBox
        padding={16}
        backgroundColor={colors.card}
        justifyContent='space-between'
      >
        <Label>{t('language')}</Label>
        <LanguageSwitcher />
      </HBox>
      <Divider />
    </Layout>
  )
}
