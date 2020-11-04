import { RouteProp, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native'
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
export const HomeScreen: React.FC<Props> = () => {
  const { colors } = useTheme()

  return (
    <Layout>
      <Text style={{ color: colors.text }}>This is HomeScreen.</Text>
    </Layout>
  )
}
