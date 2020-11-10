import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useContext, useEffect } from 'react'
import { EventUpdate } from '~/components/event'
import { Layout } from '~/components/screen'
import { EventManagerContext } from '~/hooks/event-manager'
import { RootStackParams } from '~/navigation'
import { Loading } from '~/ui'

/**
 * <EventScreen /> props.
 */
interface Props {
  route: RouteProp<RootStackParams, 'Event'>
  navigation: StackNavigationProp<RootStackParams, 'Event'>
}

/**
 * Event screen.
 * @param props Props.
 * @returns <EventScreen />
 */
export const EventScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params
  const { select, current } = useContext(EventManagerContext)

  const handleFinish = useCallback(() => {
    select()
    navigation.goBack()
  }, [select, navigation])

  useEffect(() => {
    select(id)
  }, [select, id])

  return (
    <Layout>
      {current ? <EventUpdate onFinish={handleFinish} /> : <Loading />}
    </Layout>
  )
}
