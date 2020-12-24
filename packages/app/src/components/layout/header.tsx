import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { GradientBox } from '~/ui'
import { Logo } from './logo'

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Rubik_500Medium'
  },
  logo: {}
})

/**
 * Header.
 */
export const Header: React.FC = () => {
  return (
    <GradientBox
      colors={['#58C4E7', '#26A1D8']}
      style={styles.container}
      accessible
      accessibilityRole='header'
      accessibilityLabel='Header'
    >
      <Text
        style={styles.title}
        accessible
        accessibilityRole='text'
        accessibilityLabel='Since'
      >
        Since
      </Text>
      <Logo size={32} style={styles.logo} />
    </GradientBox>
  )
}
