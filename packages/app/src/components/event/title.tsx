import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventAction } from '~/hooks/event-manager'
import { EVENT_TITLE_MAX_LENGTH as MAX_LENGTH } from '~/models'
import { useTheme } from '~/theme'
import { HBox, Hint, Icon, Pressable, TextInput, VBox } from '~/ui'
import { Toolbar } from '../screen'

/**
 * &lt;Title /> props.
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
 * @returns &lt;Title />.
 */
export const EventTitle: React.FC<Props> = props => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const { action, onAction, onCancel, loading, value, onChange } = props
  const charsLeft = useMemo(() => MAX_LENGTH - value.length, [value])

  return (
    <Toolbar colors={colors.toolbar.background}>
      <TextInput
        flex={1}
        value={value}
        onChangeText={onChange}
        multiline={false}
        maxLength={MAX_LENGTH}
        placeholder={t('event.title.placeholder')}
        placeholderTextColor={colors.hint}
        accessible
        accessibilityHint={t('event.title.hint')}
        accessibilityLabel={t('event.title')}
      />
      {Boolean(value) && (
        <>
          <VBox position='absolute' top={0} right={16} alignItems='flex-end'>
            <Hint
              color={colors.toolbar.text}
              accessible
              accessibilityRole='summary'
              accessibilityLabel={t('chars')}
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
              accessibilityHint={t(`event.${action}.hint`)}
              accessibilityLabel={t(`event.${action}`)}
            >
              <Icon
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
              accessibilityHint={t(`event.${action}.cancel.hint`)}
              accessibilityLabel={t(`event.${action}.cancel`)}
            >
              <Icon name='window-close' size={20} color={colors.toolbar.text} />
            </Pressable>
          </HBox>
        </>
      )}
    </Toolbar>
  )
}
