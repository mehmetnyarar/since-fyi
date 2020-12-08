import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { ReactElement, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getDayOptions,
  getEveryOptions,
  getFrequencyOptions,
  getMonthOptions,
  getPresetOptions
} from '~/hooks/event-form'
import {
  Frequency,
  getReminder,
  getSchedule,
  Reminder,
  Schedule,
  SCHEDULE_AVAILABILITY
} from '~/models'
import { useTheme } from '~/theme'
import {
  Divider,
  HBox,
  Label,
  PickerInput,
  Pressable,
  SwipeableList,
  SwipeableProps
} from '~/ui'
import { ArrayUtils } from '~/utility'
import { EventSchedule } from './schedule'

/**
 * &lt;EventReminder /> props.
 */
interface Props {
  date?: Date
  value: Reminder
  onChange: (value: Reminder) => void
}

/**
 * Event reminder.
 * @param props Props.
 * @returns &lt;EventReminder />.
 */
export const EventReminder: React.FC<Props> = props => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const { date, value: reminder, onChange } = props

  // #region Preset

  const { preset } = reminder
  const isCustomPreset = useMemo(() => preset === 'CUSTOM', [preset])
  const presetOptions = useMemo(() => getPresetOptions(), [])
  const handlePresetChange = useCallback(
    (value?: string | number) => {
      const newReminder = getReminder(date, { preset: value as string })
      onChange(newReminder)
    },
    [date, onChange]
  )

  // #endregion

  // #region Frequency & Every

  const { frequency } = reminder
  const frequencyOptions = useMemo(() => getFrequencyOptions(), [])
  const handleFrequencyChange = useCallback(
    (value?: string | number) => {
      onChange(
        getReminder(date, {
          ...reminder,
          frequency: value as Frequency,
          every: 1,
          schedules: []
        })
      )
    },
    [date, reminder, onChange]
  )

  // #endregion

  // #region Every

  const { every } = reminder
  const everyOptions = useMemo(() => getEveryOptions(frequency), [frequency])
  const handleEveryChange = useCallback(
    (value?: string | number) => {
      onChange({ ...reminder, every: Number(value) })
    },
    [reminder, onChange]
  )

  // #endregion

  // #region Schedules

  const { schedules } = reminder
  const areSchedulesEnabled = useMemo(
    () => SCHEDULE_AVAILABILITY.includes(frequency),
    [frequency]
  )
  const monthOptions = useMemo(() => getMonthOptions(frequency), [frequency])
  const dayOptions = useMemo(() => getDayOptions(frequency), [frequency])
  const handleScheduleCreate = useCallback(() => {
    const schedule = getSchedule(date, reminder.frequency)
    if (schedule) {
      onChange({
        ...reminder,
        schedules: [...reminder.schedules, schedule]
      })
    }
  }, [date, reminder, onChange])

  const handleScheduleChange = useCallback(
    (value: Schedule, index: number) => {
      onChange({
        ...reminder,
        schedules: ArrayUtils.replace(reminder.schedules, index, value)
      })
    },
    [reminder, onChange]
  )
  const handleScheduleRemove = useCallback(
    (index: number) => {
      onChange({
        ...reminder,
        schedules: ArrayUtils.remove(reminder.schedules, index)
      })
    },
    [reminder, onChange]
  )

  // #endregion

  return (
    <>
      <HBox
        padding={16}
        backgroundColor={colors.card}
        justifyContent='space-between'
      >
        <Label>{t('reminder.preset')}</Label>
        <PickerInput
          options={presetOptions.map(option => ({
            label: t(option.label),
            value: option.value
          }))}
          value={preset}
          onChange={handlePresetChange}
          accessibilityHint={t('reminder.preset.hint')}
          accessibilityLabel={t('reminder.preset')}
          dialogProps={{
            title: t('reminder.preset'),
            cancelLabel: t('cancel'),
            confirmLabel: t('confirm')
          }}
          pickerProps={{
            accessibilityHint: t('reminder.preset.pick.hint'),
            accessibilityLabel: t('reminder.preset.pick')
          }}
        />
      </HBox>
      <HBox
        hidden={!isCustomPreset}
        paddingHorizontal={16}
        paddingBottom={16}
        backgroundColor={colors.card}
        justifyContent='flex-end'
      >
        <PickerInput
          width={48}
          height={48}
          padding={16}
          marginLeft={8}
          paddingHorizontal={8}
          options={everyOptions}
          value={every}
          onChange={handleEveryChange}
          accessible={isCustomPreset}
          accessibilityHint={t('reminder.every.hint')}
          accessibilityLabel={t('reminder.every')}
          dialogProps={{
            title: t('reminder.every'),
            cancelLabel: t('cancel'),
            confirmLabel: t('confirm')
          }}
          pickerProps={{
            accessibilityHint: t('reminder.every.pick.hint'),
            accessibilityLabel: t('reminder.every.pick')
          }}
        />
        <PickerInput
          height={48}
          padding={16}
          marginLeft={8}
          paddingHorizontal={8}
          options={frequencyOptions.map(option => ({
            label: t(option.label, { count: every }),
            value: option.value
          }))}
          value={frequency}
          onChange={handleFrequencyChange}
          accessible={isCustomPreset}
          accessibilityHint={t('reminder.frequency.hint')}
          accessibilityLabel={t('reminder.frequency')}
          dialogProps={{
            title: t('reminder.frequency'),
            cancelLabel: t('cancel'),
            confirmLabel: t('confirm')
          }}
          pickerProps={{
            accessibilityHint: t('reminder.frequency.pick.hint'),
            accessibilityLabel: t('reminder.frequency.pick')
          }}
        />
      </HBox>
      <Divider />
      {areSchedulesEnabled && (
        <>
          <HBox
            padding={16}
            backgroundColor={colors.card}
            justifyContent='space-between'
          >
            <Label>{t('schedules')}</Label>
            <Pressable
              width={32}
              height={32}
              borderRadius={16}
              variant='basic'
              appearance='transparent'
              onPress={handleScheduleCreate}
              accessibilityHint={t('schedule.create.hint')}
              accessibilityLabel={t('schedule.create')}
            >
              <MaterialCommunityIcons
                name='plus'
                size={24}
                color={colors.text}
              />
            </Pressable>
          </HBox>
          <SwipeableList accessible accessibilityLabel={t('schedules')}>
            {schedules.map<ReactElement<SwipeableProps>>((schedule, index) => (
              <EventSchedule
                key={index}
                monthOptions={monthOptions}
                dayOptions={dayOptions}
                value={schedule}
                onChange={value => handleScheduleChange(value, index)}
                onRemove={index ? () => handleScheduleRemove(index) : undefined}
              />
            ))}
          </SwipeableList>
          <Divider />
        </>
      )}
    </>
  )
}
