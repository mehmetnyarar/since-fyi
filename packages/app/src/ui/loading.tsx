import React from 'react'
import { styled, useTheme } from '~/theme'
import { Box } from './box'

/**
 * Loading.
 * @param props Props.
 * @returns <Loading />.
 */
export const Loading = styled.ActivityIndicator``

/**
 * Full-screen loading.
 */
export const FullScreenLoading: React.FC = () => {
  const { colors } = useTheme()

  return (
    <Box flex={1} justifyContent='center' alignItems='center'>
      <Loading animating size='large' color={colors.primary} />
    </Box>
  )
}
