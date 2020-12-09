import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { EventCreate } from '~/components/event'
import { Layout } from '~/components/screen'
import { EventManagerContext } from '~/hooks/event-manager'
import { MainNavigationParams } from '~/navigation'
import { Pressable } from '~/ui'

/**
 * &lt;HomeScreen /> props.
 */
interface Props {
  route: RouteProp<MainNavigationParams, 'Home'>
  navigation: StackNavigationProp<MainNavigationParams, 'Home'>
}

/**
 * Home screen.
 * @param props Props.
 * @returns &lt;HomeScreen />.
 */
export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()

  const { clear, result } = useContext(EventManagerContext)
  const handleSuccess = useCallback(
    (id?: string) => {
      console.debug('HomeScreen/handleSuccess', { id })
      navigation.navigate('Event', { id })
    },
    [navigation]
  )

  return (
    <Layout>
      <EventCreate onSuccess={handleSuccess} />
      <Pressable
        variant='basic'
        appearance='transparent'
        text={t('clear.all', { count: result?.length })}
        onPress={clear}
      />
    </Layout>
  )
}
