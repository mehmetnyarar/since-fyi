import * as yup from 'yup'
import {
  Event,
  EVENT_TITLE_MAX_LENGTH,
  Frequency,
  Reminder,
  Schedule
} from '~/models'

/**
 * Regular expression for HH:mm.
 */
export const timeRegexp = /^([0-1]\d|2[0-3]):[0-5]\d$/

/**
 * Schedule schema.
 */
export const scheduleSchema = yup.object<Schedule>({
  month: yup.number(),
  day: yup.number(),
  time: yup.string().matches(timeRegexp).required(),
  isActive: yup.boolean().defined()
})

/**
 * Reminder schema.
 */
export const reminderSchema = yup.object<Reminder>({
  notificationId: yup.string(),
  preset: yup.string(),
  frequency: yup.string().required().oneOf(Object.values(Frequency)),
  every: yup.number().required().min(1),
  schedules: yup.array().of(scheduleSchema.required()).required()
})

/**
 * Event schema.
 */
export const eventSchema = yup.object<Event>({
  id: yup.string(),
  title: yup.string().required().max(EVENT_TITLE_MAX_LENGTH),
  start: yup.date(),
  isActive: yup.boolean().defined(),
  hasReminder: yup.boolean().defined(),
  reminder: reminderSchema.nullable(true)
})
