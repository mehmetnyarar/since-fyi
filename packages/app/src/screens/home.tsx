import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Layout } from '~/components/layout'
import { RootParamList } from '~/navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

/**
 * Home screen props.
 */
type Props = StackNavigationProp<RootParamList, 'Home'>

/**
 * Home screen.
 */
export const HomeScreen: React.FC<Props> = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text>This is HomeScreen.</Text>
      </View>
    </Layout>
  )
}
