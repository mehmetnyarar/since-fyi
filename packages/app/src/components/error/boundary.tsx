import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: 'red'
  }
})

/**
 * &lt;ErrorBoundary /> props.
 */
interface Props {
  message?: string
}

/**
 * &lt;ErrorBoundary /> state.
 */
interface State {
  hasError?: boolean
}

/**
 * Error boundary.
 * @param props Props.
 * @returns &lt;ErrorBoundary />.
 * @see https://reactjs.org/docs/error-boundaries.html.
 * @todo Implement theme.
 * @todo Implement i18n.
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
      const { message = 'Something went wrong!' } = this.props

      return (
        <View style={styles.container}>
          <Text style={styles.error}>{message}</Text>
        </View>
      )
    }

    return children
  }
}
