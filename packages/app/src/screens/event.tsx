import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native'
import { Layout } from '~/components/screen'
import { RootStackParams } from '~/navigation'

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
export const EventScreen: React.FC<Props> = () => {
  return (
    <Layout>
      <Text>This is EventScreen.</Text>
    </Layout>
  )
}
