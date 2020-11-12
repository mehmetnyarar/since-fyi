import { yupResolver } from '@hookform/resolvers/yup'
import { useTypedController } from '@hookform/strictly-typed'
import merge from 'lodash/merge'
import { useCallback, useMemo } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { DEFAULT_EVENT, Event } from '~/models'
import { AT_VISIBILITY, ON_VISIBILITY } from '../event-manager'
import { eventSchema } from './const'
import { getFrequencyOptions, getPresetOptions, ON_OPTIONS } from './options'

/**
 * Event form options.
 */
export interface EventFormOptions {
  event?: Partial<Event>
  onCreate: (event: Event) => void | Promise<void>
  onUpdate: (event: Event) => void | Promise<void>
}

/**
 * Event form hook.
 * @param options Options.
 * @returns Event form.
 */
export const useEventForm = (options: EventFormOptions) => {
  const { event = {}, onCreate, onUpdate } = options

  const form = useForm<Event>({
    resolver: yupResolver(eventSchema),
    defaultValues: merge({}, DEFAULT_EVENT, event)
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
      const e = merge({}, DEFAULT_EVENT, event, values)

      if (e.id) await onUpdate(e)
      else await onCreate(e)
    },
    [event, onCreate, onUpdate]
  )
  const onSubmit = handleSubmit(onValid, onInvalid)

  return {
    TypedController,
    values,
    setValue,
    onSubmit,
    presetOptions,
    handlePresetChange,
    frequencyOptions,
    isAtVisible,
    isOnVisible,
    onOptions
  }
}
