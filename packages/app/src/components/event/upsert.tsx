import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useEventForm } from '~/hooks/event-form'
import { EventManagerContext } from '~/hooks/event-manager'
import { Event } from '~/models'
import { DateTimeInput, ScrollBox, Switch, VBox } from '~/ui'
import { Row } from '../row'
import { EventReminder } from './reminder'
import { EventTitle } from './title'

/**
 * &lt;EventUpsert /> props.
 */
interface Props {
  event?: Event
  onSuccess: () => void | Promise<void>
  onCancel: () => void | Promise<void>
}

/**
 * Allows user to create a new event or update an existing event.
 * @param props Props.
 * @returns &lt;EventUpsert />.
 */
export const EventUpsert: React.FC<Props> = props => {
  const { event, onSuccess, onCancel } = props

  const { t } = useTranslation()

  const { current, create, update, loading } = useContext(EventManagerContext)
  const handleCreate = useCallback(
    async (value: Event) => {
      await create(value)
      onSuccess()
    },
    [create, onSuccess]
  )
  const handleUpdate = useCallback(
    async (value: Event) => {
      await update(value)
    },
    [update]
  )

  const { TypedController, action, values, onSubmit } = useEventForm({
    event: event || current,
    onCreate: handleCreate,
    onUpdate: handleUpdate
  })

  const { start, isActive, hasReminder } = values

  console.debug('Upsert/render', { values })

  return (
    <ScrollBox>
      <TypedController
        name='title'
        render={({ value, onChange }) => {
          return (
            <EventTitle
              action={action}
              onAction={onSubmit}
              onCancel={onCancel}
              loading={loading}
              value={value}
              onChange={onChange}
            />
          )
        }}
      />
      <TypedController
        name='isActive'
        render={({ value, onChange }) => (
          <Row label={t('event.active')}>
            <Switch
              value={value}
              onValueChange={onChange}
              accessible
              accessibilityRole='switch'
              accessibilityHint={t(`event.active.${value}.hint`)}
              accessibilityLabel={t(`event.active.${value}`)}
            />
          </Row>
        )}
      />
      <VBox
        hidden={!isActive}
        accessible
        accessibilityLabel={t('event.settings')}
      >
        <TypedController
          name='start'
          render={({ value, onChange }) => (
            <Row label={t('event.start')}>
              <DateTimeInput
                mode='datetime'
                value={value}
                onChange={onChange}
                accessibilityHint={t('event.start.hint')}
                accessibilityLabel={t('event.start')}
                dialogProps={{
                  title: t('event.start'),
                  cancelLabel: t('cancel'),
                  confirmLabel: t('confirm')
                }}
                pickerProps={{
                  accessibilityRole: t('event.start.pick.hint'),
                  accessibilityLabel: t('event.start.pick')
                }}
              />
            </Row>
          )}
        />
        <TypedController
          name='hasReminder'
          render={({ value, onChange }) => {
            return (
              <Row hidden={!isActive} label={t('reminder.active')}>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  accessibilityHint={t(`reminder.active.${value}.hint`)}
                  accessibilityLabel={t(`reminder.active.${value}`)}
                />
              </Row>
            )
          }}
        />
        <TypedController
          name='reminder'
          render={({ value, onChange }) => (
            <VBox
              hidden={!(isActive && hasReminder)}
              accessible
              accessibilityLabel={t('reminder.settings')}
            >
              {value && (
                <EventReminder date={start} value={value} onChange={onChange} />
              )}
            </VBox>
          )}
        />
      </VBox>
    </ScrollBox>
  )
}
