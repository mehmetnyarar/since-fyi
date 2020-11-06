import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useMemo } from 'react'
import { TextInputProps } from 'react-native'
import { EventAction } from '~/hooks/event-manager'
import { useTheme } from '~/theme'
import { HBox, Hint, Pressable, VBox } from '~/ui'
import { Container } from './container'
import { Input } from './input'

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

  const { palette } = useTheme()

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
      colors={[palette.primary[500], palette.primary[600]]}
      accessible
      accessibilityRole='header'
      accessibilityLabel='Event title'
    >
      <Input
        {...inputProps}
        value={value}
        onChangeText={onChange}
        multiline={false}
        maxLength={maxLength}
        placeholder='Write something to remember'
        placeholderTextColor={palette.basic[600]}
        accessible
        accessibilityLabel='Enter an event title'
      />
      {Boolean(value) && (
        <>
          <VBox alignItems='flex-end' position='absolute' top={0} right={16}>
            <Hint fontSize={8} color={palette.primary[300]}>
              {`${charsLeft}/${maxLength}`}
            </Hint>
          </VBox>
          <HBox>
            <Pressable
              variant='primary'
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
                color={palette.basic[100]}
              />
            </Pressable>
            <Pressable
              variant='primary'
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
                color={palette.basic[100]}
              />
            </Pressable>
          </HBox>
        </>
      )}
    </Container>
  )
}
