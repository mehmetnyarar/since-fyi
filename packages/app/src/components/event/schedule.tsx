import React, { ReactElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Schedule } from '~/models'
import { useTheme } from '~/theme'
import {
  DateTimeInput,
  HBox,
  Icon,
  PickerInput,
  Pressable,
  SelectOption,
  Swipeable,
  SwipeableProps,
  Switch
} from '~/ui'
import { getTime, setTime } from '~/utility'

/**
 * &lt;EventSchedule /> props.
 */
interface Props extends SwipeableProps {
  monthOptions: SelectOption[]
  dayOptions: SelectOption[]
  value: Schedule
  onChange: (value: Schedule) => void
  onRemove?: () => void
}

/**
 * Event schedule.
 * @param props Props.
 * @returns &lt;EventSchedule />.
 */
export const EventSchedule: React.FC<Props> = props => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const {
    monthOptions,
    dayOptions,
    value: schedule,
    onChange,
    onRemove,
    ...swipeableProps
  } = props

  const rightActions = useMemo(() => {
    const actions: ReactElement<SwipeableProps>[] = []

    if (onRemove) {
      actions.push(
        <Pressable
          width={64}
          height={64}
          variant='danger'
          appearance='filled'
          onPress={onRemove}
          accessibilityHint={t('delete.hint')}
          accessibilityLabel={t('delete')}
        >
          <Icon name='trash-can-outline' size={32} color={colors.text} />
        </Pressable>
      )
    }

    return actions.length ? actions : undefined
  }, [onRemove, t, colors])

  return (
    <Swipeable rightActions={rightActions} {...swipeableProps}>
      <HBox
        height={64}
        padding={16}
        backgroundColor={colors.card}
        justifyContent='space-between'
      >
        <Switch
          value={schedule.isActive}
          onValueChange={value => onChange({ ...schedule, isActive: value })}
          accessible
          accessibilityRole='switch'
          accessibilityHint={t(`schedule.active.${schedule.isActive}.hint`)}
          accessibilityLabel={t(`schedule.active.${schedule.isActive}`)}
        />
        <HBox>
          {Boolean(monthOptions.length) && (
            <PickerInput
              options={monthOptions.map(option => ({
                label: t(option.label),
                value: option.value
              }))}
              value={schedule.month}
              onChange={value =>
                onChange({ ...schedule, month: value as number })}
              accessibilityHint={t('schedule.month.hint')}
              accessibilityLabel={t('schedule.month')}
              dialogProps={{
                title: t('schedule.month'),
                cancelLabel: t('cancel'),
                confirmLabel: t('confirm')
              }}
              pickerProps={{
                accessibilityHint: t('schedule.month.pick.hint'),
                accessibilityLabel: t('schedule.month.pick')
              }}
            />
          )}
          {Boolean(dayOptions.length) && (
            <PickerInput
              options={dayOptions.map(option => ({
                label: t(option.label),
                value: option.value
              }))}
              value={schedule.day}
              onChange={value =>
                onChange({ ...schedule, day: value as number })}
              accessibilityHint={t('schedule.day.hint')}
              accessibilityLabel={t('schedule.day')}
              dialogProps={{
                title: t('schedule.day'),
                cancelLabel: t('cancel'),
                confirmLabel: t('confirm')
              }}
              pickerProps={{
                accessibilityHint: t('schedule.day.pick.hint'),
                accessibilityLabel: t('schedule.day.pick')
              }}
            />
          )}
          <DateTimeInput
            mode='time'
            value={setTime(schedule.time)}
            onChange={date => onChange({ ...schedule, time: getTime(date) })}
            accessibilityHint={t('schedule.time.hint')}
            accessibilityLabel={t('schedule.time')}
            dialogProps={{
              title: t('schedule.time'),
              cancelLabel: t('cancel'),
              confirmLabel: t('confirm')
            }}
          />
        </HBox>
      </HBox>
    </Swipeable>
  )
}
