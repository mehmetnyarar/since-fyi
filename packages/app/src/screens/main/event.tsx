import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { EventUpsert } from '~/components/event'
import { Layout } from '~/components/screen'
import { MainNavigationParams } from '~/navigation'

/**
 * <EventScreen /> props.
 */
interface Props {
  route: RouteProp<MainNavigationParams, 'Event'>
  navigation: StackNavigationProp<MainNavigationParams, 'Event'>
}

/**
 * Event screen.
 * @param props Props.
 * @returns &lt;EventScreen />
 */
export const EventScreen: React.FC<Props> = ({ navigation }) => {
  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <Layout>
      <EventUpsert onSuccess={handleGoBack} onCancel={handleGoBack} />
    </Layout>
  )
}
