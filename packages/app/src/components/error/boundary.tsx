import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Layout } from '../screen'

const styles = StyleSheet.create({
  error: {
    color: 'red'
  }
})

/**
 * <ErrorBoundary /> props.
 */
interface Props {
  message?: string
}

/**
 * <ErrorBoundary /> state.
 */
interface State {
  hasError?: boolean
}

/**
 * Error boundary.
 * @see https://reactjs.org/docs/error-boundaries.html.
 * @returns <ErrorBoundary />.
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
        <Layout>
          <Text style={styles.error}>{message}</Text>
        </Layout>
      )
    }

    return children
  }
}
