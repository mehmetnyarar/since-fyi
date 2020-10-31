import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useMemo, useState } from 'react'
import { Pressable, StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 64,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#FFFFFF'
  },
  action: {
    width: 32,
    height: 32,
    marginLeft: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionPressIn: {
    backgroundColor: '#1B7EB9'
  }
})

/**
 * Toolbar.
 */
export const Toolbar: React.FC = () => {
  const [event, setEvent] = useState('')
  const onEventChange = useCallback((value = '') => setEvent(value), [])
  const onAction = useCallback(() => {
    // TODO User action
    console.log('User action')
  }, [])

  const [actionPressed, setActionPressed] = useState(false)
  const toggleActionPressed = useCallback(() => {
    setActionPressed(value => !value)
  }, [])

  const actionStyles = useMemo(() => {
    return actionPressed
      ? [styles.action, styles.actionPressIn]
      : [styles.action]
  }, [actionPressed])

  return (
    <LinearGradient
      colors={['#26A1D8', '#1B7EB9']}
      style={styles.container}
      accessible
      accessibilityRole='toolbar'
      accessibilityLabel='Event Toolbar'
    >
      <TextInput
        value={event}
        onChangeText={onEventChange}
        placeholder='Write something to remember'
        placeholderTextColor='#C4C4C4'
        style={styles.input}
        accessible
        accessibilityLabel='Event Title'
      />
      {Boolean(event) && (
        <Pressable
          onPress={onAction}
          onPressIn={toggleActionPressed}
          onPressOut={toggleActionPressed}
          style={actionStyles}
          accessible
          accessibilityRole='button'
          accessibilityLabel='Add event'
        >
          <Feather name='plus' size={16} color='#FFF' />
        </Pressable>
      )}
    </LinearGradient>
  )
}
