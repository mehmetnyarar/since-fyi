import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '~/components/screen'
import { DrawerNavigationParams } from '~/navigation'
import { Typography } from '~/ui'

/**
 * <AboutScreen /> props.
 */
interface Props {
  route: RouteProp<DrawerNavigationParams, 'About'>
  navigation: DrawerNavigationProp<DrawerNavigationParams, 'About'>
}

/**
 * Application info.
 * @param props Props.
 * @returns <AboutScreen />.
 */
export const AboutScreen: React.FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <Layout title={t('about')} justifyContent='center' alignItems='center'>
      <Typography>AboutScreen</Typography>
    </Layout>
  )
}
