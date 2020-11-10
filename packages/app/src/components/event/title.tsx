import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo } from 'react'
import { EventAction } from '~/hooks/event-manager'
import { styled, useTheme } from '~/theme'
import { HBox, Hint, Pressable, TextInput, TextInputProps, VBox } from '~/ui'

/**
 * Styled <LinearGradient />.
 */
export const Container = styled(LinearGradient)`
  height: 64px;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

/**
 * <TextInput /> props except `value` and `onChange`
 * which are handled in the component.
 */
type InputProps = Omit<TextInputProps, 'value' | 'onChange'>

/**
 * <Title /> props.
 */
interface Props extends InputProps {
  action: EventAction
  onAction: () => void | Promise<void>
  onCancel: () => void | Promise<void>
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

/**
 * Event title.
 * @param props Props.
 * @returns <Title />.
 */
export const Title: React.FC<Props> = props => {
  const {
    action,
    onAction,
    onCancel,
    loading,
    value = '',
    onChange,
    maxLength = 35,
    ...inputProps
  } = props

  const { colors } = useTheme()

  const actionIcon = useMemo(() => {
    return action === 'create' ? 'plus' : 'check'
  }, [action])
  const actionLabel = useMemo(() => {
    return action === 'create' ? 'Add event' : 'Update event'
  }, [action])
  const charsLeft = useMemo(() => {
    return maxLength - value.length
  }, [value, maxLength])

  return (
    <Container
      colors={colors.toolbar.back}
      accessible
      accessibilityRole='header'
      accessibilityLabel='Event title'
    >
      <TextInput
        {...inputProps}
        flex={1}
        value={value}
        onChangeText={onChange}
        multiline={false}
        maxLength={maxLength}
        placeholder='Write something to remember'
        placeholderTextColor={colors.hint}
        accessible
        accessibilityLabel='Enter an event title'
      />
      {Boolean(value) && (
        <>
          <VBox position='absolute' top={0} right={16} alignItems='flex-end'>
            <Hint>{`${charsLeft}/${maxLength}`}</Hint>
          </VBox>
          <HBox>
            <Pressable
              variant='primary'
              appearance='filled'
              width={32}
              height={32}
              marginLeft={8}
              borderRadius={16}
              onPress={onAction}
              disabled={loading}
              accessibilityLabel={actionLabel}
            >
              <MaterialCommunityIcons
                name={actionIcon}
                size={24}
                color={colors.toolbar.text}
              />
            </Pressable>
            <Pressable
              variant='primary'
              appearance='filled'
              width={32}
              height={32}
              marginLeft={8}
              borderRadius={16}
              onPress={onCancel}
              disabled={loading}
              accessibilityLabel='Cancel'
            >
              <MaterialCommunityIcons
                name='window-close'
                size={20}
                color={colors.toolbar.text}
              />
            </Pressable>
          </HBox>
        </>
      )}
    </Container>
  )
}
