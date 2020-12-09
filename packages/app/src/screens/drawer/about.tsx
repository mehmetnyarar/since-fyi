import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import pkg from 'package.json'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '~/components/screen'
import { DrawerNavigationParams } from '~/navigation'
import { Typography } from '~/ui'

/**
 * &lt;AboutScreen /> props.
 */
interface Props {
  route: RouteProp<DrawerNavigationParams, 'About'>
  navigation: DrawerNavigationProp<DrawerNavigationParams, 'About'>
}

/**
 * Application info.
 * @param props Props.
 * @returns &lt;AboutScreen />.
 */
export const AboutScreen: React.FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <Layout title={t('about')} padding={16}>
      <Typography>{t('app.description')}</Typography>
      <Typography marginTop={16}>
        {t('app.version', { version: pkg.version })}
      </Typography>
    </Layout>
  )
}
