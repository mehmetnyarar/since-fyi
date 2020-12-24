import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useContext, useEffect } from 'react'
import { EventUpsert } from '~/components/event'
import { Layout } from '~/components/screen'
import { EventManagerContext } from '~/hooks/event-manager'
import { getEvent } from '~/models'
import { MainNavigationParams } from '~/navigation'

/**
 * &lt;EventScreen /> props.
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
export const EventScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id, title } = route.params
  const { select, current } = useContext(EventManagerContext)
  useEffect(() => {
    select(id || getEvent({ title }))
  }, [select, id, title])

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <Layout>
      {current && (
        <EventUpsert onSuccess={handleGoBack} onCancel={handleGoBack} />
      )}
    </Layout>
  )
}
