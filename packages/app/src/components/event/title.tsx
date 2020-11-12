import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useMemo } from 'react'
import { EventAction } from '~/hooks/event-manager'
import { EVENT_TITLE_MAX_LENGTH as MAX_LENGTH } from '~/models'
import { useTheme } from '~/theme'
import { HBox, Hint, Pressable, TextInput, VBox } from '~/ui'
import { Toolbar } from '../screen'

/**
 * <Title /> props.
 */
interface Props {
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
  const { action, onAction, onCancel, loading, value = '', onChange } = props

  const { colors } = useTheme()
  const charsLeft = useMemo(() => MAX_LENGTH - value.length, [value])

  return (
    <Toolbar
      colors={colors.toolbar.back}
      accessible
      accessibilityRole='header'
      accessibilityLabel='Event title'
    >
      <TextInput
        flex={1}
        value={value}
        onChangeText={onChange}
        multiline={false}
        maxLength={MAX_LENGTH}
        placeholder='Write something to remember'
        placeholderTextColor={colors.hint}
        accessible
        accessibilityLabel='Enter an event title'
      />
      {Boolean(value) && (
        <>
          <VBox position='absolute' top={0} right={16} alignItems='flex-end'>
            <Hint
              accessible
              accessibilityRole='summary'
              accessibilityLabel='Characters'
            >
              {`${charsLeft}/${MAX_LENGTH}`}
            </Hint>
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
              accessibilityLabel={
                action === 'create' ? 'Add event' : 'Update event'
              }
            >
              <MaterialCommunityIcons
                name={action === 'create' ? 'plus' : 'check'}
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
    </Toolbar>
  )
}
