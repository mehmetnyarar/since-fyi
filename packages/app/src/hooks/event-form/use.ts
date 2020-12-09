import { yupResolver } from '@hookform/resolvers/yup'
import { useTypedController } from '@hookform/strictly-typed'
import merge from 'lodash/merge'
import { nanoid } from 'nanoid/async/index.native'
import { useCallback, useEffect, useMemo } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { DEFAULT_EVENT, Event, getReminder } from '~/models'
import { EventAction } from '../event-manager'
import { eventSchema } from './const'

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

  const { control, watch, handleSubmit, setValue } = form
  const TypedController = useTypedController<Event>({
    control
  })

  const values = useMemo<Event>(watch, [watch])
  const { start, hasReminder, reminder, updatedAt } = values

  const action = useMemo<EventAction>(() => {
    return updatedAt ? 'update' : 'create'
  }, [updatedAt])

  useEffect(() => {
    if (hasReminder && !reminder) {
      setValue('reminder', getReminder(start))
    }
  }, [start, hasReminder, reminder, setValue])

  const onInvalid = useCallback<SubmitErrorHandler<Event>>(errors => {
    console.warn('onInvalid', { errors })
  }, [])
  const onValid = useCallback<SubmitHandler<Event>>(
    async values => {
      const e = merge({}, DEFAULT_EVENT, event, values)

      if (e.id) await onUpdate(e)
      else await onCreate(merge({}, e, { id: await nanoid(6) }))
    },
    [event, onCreate, onUpdate]
  )
  const onSubmit = handleSubmit(onValid, onInvalid)

  return {
    ...form,
    TypedController,
    action,
    values,
    onSubmit
  }
}
