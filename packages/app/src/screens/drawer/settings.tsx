import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '~/components/i18n'
import { Row } from '~/components/row'
import { Layout } from '~/components/screen'
import { DrawerNavigationParams } from '~/navigation'

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
 * @returns &lt;SettingsScreen />.
 */
export const SettingsScreen: React.FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <Layout title={t('settings')}>
      <Row label={t('language')}>
        <LanguageSwitcher />
      </Row>
    </Layout>
  )
}
