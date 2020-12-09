import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '~/components/screen'
import { DrawerNavigationParams } from '~/navigation'
import { Typography } from '~/ui'

/**
 * &lt;PolicyScreen /> props.
 */
interface Props {
  route: RouteProp<DrawerNavigationParams, 'Policy'>
  navigation: DrawerNavigationProp<DrawerNavigationParams, 'Policy'>
}

/**
 * Application policy.
 * @param props Props.
 * @returns &lt;PolicyScreen />.
 */
export const PolicyScreen: React.FC<Props> = props => {
  const { type } = props.route.params
  const { t } = useTranslation()

  return (
    <Layout
      title={t(`policy.${type}`)}
      justifyContent='center'
      alignItems='center'
    >
      <Typography>{type}</Typography>
    </Layout>
  )
}
