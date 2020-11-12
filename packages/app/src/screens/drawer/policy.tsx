import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '~/components/screen'
import { DrawerNavigationParams } from '~/navigation'
import { Typography } from '~/ui'

/**
 * <PolicyScreen /> props.
 */
interface Props {
  route: RouteProp<DrawerNavigationParams, 'Policy'>
  navigation: DrawerNavigationProp<DrawerNavigationParams, 'Policy'>
}

/**
 * Application policy.
 * @param props Props.
 * @returns <PolicyScreen />.
 */
export const PolicyScreen: React.FC<Props> = ({ route }) => {
  const { t } = useTranslation()
  const { type } = route.params

  return (
    <Layout
      title={t(`policy.${type}`)}
      justifyContent='center'
      alignItems='center'
    >
      <Typography>PolicyScreen</Typography>
      <Typography>{`Type: ${type}`}</Typography>
    </Layout>
  )
}
