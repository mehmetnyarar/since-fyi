import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useContext, useEffect } from 'react'
import { EventUpsert } from '~/components/event'
import { Layout } from '~/components/screen'
import { EventManagerContext } from '~/hooks/event-manager'
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
 * @returns <EventScreen />
 */
export const EventScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params
  const { select } = useContext(EventManagerContext)

  const handleFinish = useCallback(() => {
    select()
    navigation.goBack()
  }, [select, navigation])

  useEffect(() => {
    select(id)
  }, [select, id])

  return (
    <Layout>
      <EventUpsert onFinish={handleFinish} />
    </Layout>
  )
}
