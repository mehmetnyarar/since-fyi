import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Layout } from '~/components/screen'
import { RootStackParams } from '~/navigation'
import { H1, Pressable } from '~/ui'

/**
 * <HomeScreen /> props.
 */
interface Props {
  route: RouteProp<RootStackParams, 'Home'>
  navigation: StackNavigationProp<RootStackParams, 'Home'>
}

/**
 * Home screen.
 * @param props Props.
 * @returns <HomeScreen />
 */
export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Layout flex={1} justifyContent='center' alignItems='center'>
      <H1>This is HomeScreen.</H1>
      <Pressable
        variant='basic'
        text='Go to event'
        onPress={() => navigation.push('Event', { id: 'ab12cd34ef56' })}
        marginTop={32}
        disabled={false}
        accessibilityLabel='Go to event'
      />
    </Layout>
  )
}
