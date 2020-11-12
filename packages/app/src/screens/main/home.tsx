import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useContext } from 'react'
import { EventCreate } from '~/components/event'
import { Layout } from '~/components/screen'
import { EventManagerContext } from '~/hooks/event-manager'
import { MainNavigationParams } from '~/navigation'
import { Pressable } from '~/ui'

/**
 * <HomeScreen /> props.
 */
interface Props {
  route: RouteProp<MainNavigationParams, 'Home'>
  navigation: StackNavigationProp<MainNavigationParams, 'Home'>
}

/**
 * Home screen.
 * @param props Props.
 * @returns <HomeScreen />
 */
export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { clear, result } = useContext(EventManagerContext)
  const navigate = useCallback(
    (id?: string) => {
      console.debug('navigate', { id })
      navigation.push('Event', { id })
    },
    [navigation]
  )

  return (
    <Layout>
      <EventCreate onCreate={navigate} />
      <Pressable text={`Clear All (${result?.length})`} onPress={clear} />
    </Layout>
  )
}
