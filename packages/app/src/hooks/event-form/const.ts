import * as yup from 'yup'
import { Event, Frequency, Notification, Schedule } from '~/models'

/**
 * Regular expression for HH:mm.
 */
export const timeRegexp = /^([0-1]\d|2[0-3]):[0-5]\d$/

/**
 * Time schema.
 */
export const timeSchema = yup.object<Schedule>({
  on: yup.number(),
  time: yup.string().matches(timeRegexp).required(),
  active: yup.boolean()
})

/**
 * Notification schema.
 */
export const notificationSchema = yup.object<Notification>({
  id: yup.string(),
  preset: yup.string(),
  frequency: yup.string().required().oneOf(Object.values(Frequency)),
  every: yup.number().required().min(1),
  at: yup.array().defined().of(timeSchema.required()),
  active: yup.boolean()
})

/**
 * Event schema.
 */
export const eventSchema = yup.object<Event>({
  id: yup.string(),
  title: yup.string().required().max(35),
  start: yup.date(),
  ago: yup.number(),
  active: yup.boolean(),
  notification: notificationSchema.required()
})
