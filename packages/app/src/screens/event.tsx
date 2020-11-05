import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Layout } from '~/components/screen'
import { RootStackParams } from '~/navigation'
import { H1, Hint, Pressable } from '~/ui'

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
  return (
    <Layout flex={1} justifyContent='center' alignItems='center'>
      <H1>This is EventScreen.</H1>
      <Hint>{`Event ID: ${route.params.id}`}</Hint>
      <Pressable
        variant='basic'
        text='Go back'
        onPress={() => navigation.goBack()}
        marginTop={32}
        disabled={false}
      />
    </Layout>
  )
}
