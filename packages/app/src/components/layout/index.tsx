import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from './header'
import { Toolbar } from './toolbar'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  layout: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
})

/**
 * Layout props.
 */
interface Props {}

/**
 * Application layout.
 * @param props Props.
 */
export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.layout}>
        <Header />
        <Toolbar />
        {children}
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}
