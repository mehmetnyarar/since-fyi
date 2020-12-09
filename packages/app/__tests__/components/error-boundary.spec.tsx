import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'
import { ErrorBoundary } from '~/components/error-boundary'

// #region Setup

const Child = () => <Text>You should see me!</Text>
const ChildWithError = () => {
  throw new Error('There is an error!')
}

// #endregion

describe('ErrorBoundary', () => {
  it('should render the children', () => {
    const { queryByText } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    )
    expect(queryByText(/see me/i)).toBeTruthy()
  })

  it('should render the error message', () => {
    const { queryByText, update } = render(
      <ErrorBoundary>
        <ChildWithError />
      </ErrorBoundary>
    )
    expect(queryByText(/wrong/i)).toBeTruthy()

    update(
      <ErrorBoundary message='Custom error message'>
        <ChildWithError />
      </ErrorBoundary>
    )
    expect(queryByText(/error/i)).toBeTruthy()
  })
})
