import { LinearGradient } from 'expo-linear-gradient'
import { styled } from '~/theme'

/**
 * Styled <LinearGradient />.
 */
export const Container = styled(LinearGradient)`
  position: relative;
  height: 64px;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
