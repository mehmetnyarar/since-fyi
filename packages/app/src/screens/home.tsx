import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { EventCreate } from '~/components/event'
import { LanguageSwitcher } from '~/components/i18n'
import { Layout } from '~/components/screen'
import { RootStackParams } from '~/navigation'

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
  const handleCreate = useCallback(
    (id: string) => {
      console.debug('handleCreated', { id })
      navigation.push('Event', { id })
    },
    [navigation]
  )

  return (
    <Layout>
      <EventCreate onCreate={handleCreate} />
      <LanguageSwitcher debug />
    </Layout>
  )
}
