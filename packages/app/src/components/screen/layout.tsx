import React from 'react'
import { View } from 'react-native'

/**
 * Screen layout.
 * @param props Props.
 * @returns <ScreenLayout />.
 */
export const Layout: React.FC = ({ children }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </View>
  )
}
