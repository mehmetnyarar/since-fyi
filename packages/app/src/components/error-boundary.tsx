import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: 'red'
  }
})

interface Props {
  message?: string
}
interface State {
  hasError?: boolean
}

/**
 * Renders <ErrorBoundary />.
 * @see https://reactjs.org/docs/error-boundaries.html.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error: never) {
    // Update state so the next render will show the fallback UI.
    console.error('ErrorBoundary/getDerivedStateFromError', { error })
    return { hasError: true }
  }

  componentDidCatch (error: never, errorInfo: never) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary/componentDidCatch', { error, errorInfo })
  }

  render () {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      // You can render any custom fallback UI
      const { message = 'Something went wrong!' } = this.props

      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.error}>{message}</Text>
        </SafeAreaView>
      )
    }

    return children
  }
}
