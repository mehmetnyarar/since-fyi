import { yupResolver } from '@hookform/resolvers/yup'
import { useTypedController } from '@hookform/strictly-typed'
import merge from 'lodash/merge'
import { useCallback, useContext, useMemo } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { DEFAULT_EVENT, Event } from '~/models'
import {
  AT_VISIBILITY,
  EventManagerContext,
  ON_VISIBILITY
} from '../event-manager'
import { eventSchema } from './const'
import { getFrequencyOptions, getPresetOptions, ON_OPTIONS } from './options'

/**
 * Event form options.
 */
export interface EventFormOptions {
  onSuccess?: () => void | Promise<void>
}

/**
 * Event form hook.
 * @param options Options.
 * @returns Event form.
 */
export const useEventForm = (options: EventFormOptions = {}) => {
  const { onSuccess } = options
  const { current, update, loading } = useContext(EventManagerContext)

  const form = useForm<Event>({
    resolver: yupResolver(eventSchema),
    defaultValues: merge({}, DEFAULT_EVENT, current)
  })

  const { control, watch, setValue, handleSubmit } = form
  const TypedController = useTypedController<Event>({
    control
  })

  const values = useMemo<Event>(watch, [watch])
  const { active, frequency } = values.notification

  const presetOptions = useMemo(() => getPresetOptions(), [])
  const handlePresetChange = useCallback(
    (value: string) => {
      const parts = value.split('_')
      setValue('notification.frequency', parts[0])
      setValue('notification.every', parts[1])
    },
    [setValue]
  )

  const frequencyOptions = useMemo(() => getFrequencyOptions(), [])
  const isAtVisible = useMemo(
    () => active && AT_VISIBILITY.includes(frequency),
    [active, frequency]
  )
  const onOptions = useMemo(() => ON_OPTIONS[frequency], [frequency])
  const isOnVisible = useMemo(
    () => active && ON_VISIBILITY.includes(frequency),
    [active, frequency]
  )

  const onInvalid = useCallback<SubmitErrorHandler<Event>>(errors => {
    console.warn('onInvalid', { errors })
  }, [])
  const onValid = useCallback<SubmitHandler<Event>>(
    async values => {
      const event = merge({}, DEFAULT_EVENT, current, values)
      console.debug('onValid', { values, event })
      await update(event)

      onSuccess && onSuccess()
    },
    [update, current, onSuccess]
  )
  const onSubmit = handleSubmit(onValid, onInvalid)

  return {
    TypedController,
    values,
    setValue,
    onSubmit,
    loading,
    presetOptions,
    handlePresetChange,
    frequencyOptions,
    isAtVisible,
    isOnVisible,
    onOptions
  }
}
