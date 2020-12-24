import {
  format,
  isDate,
  parseISO,
  setHours,
  setMinutes,
  startOfDay
} from 'date-fns'

/**
 * Date mode (for inputs).
 */
export type DateMode = 'date' | 'time' | 'datetime'

/**
 * Date type.
 */
export type DateType = string | number | Date

/**
 * Display format.
 */
export enum DateFormat {
  dmy = 'dd.MM.yyyy',
  hm = 'HH:mm',
  dmyhm = 'dd.MM.yyyy HH:mm'
}

/**
 * Parses date-like value (ISO, number, Date).
 * @param [value] Value.
 * @param [defaultValue] Default value to return.
 * @returns Date.
 */
export const getDate = (value?: DateType, defaultValue?: Date) => {
  if (!value) return defaultValue

  return isDate(value)
    ? (value as Date)
    : typeof value === 'string'
      ? parseISO(value)
      : typeof value === 'number'
        ? new Date(value)
        : defaultValue
}

/**
 * Determines the display format based on input mode.
 * @param [mode="dmyhm"] Date mode.
 * @returns DateFormat.
 */
export const getDateFormat = (mode?: DateMode): DateFormat => {
  switch (mode) {
    case 'date':
      return DateFormat.dmy
    case 'time':
      return DateFormat.hm
    default:
      return DateFormat.dmyhm
  }
}

/**
 * Determines how to display a Date.
 * @param [date] Date.
 * @param [as] Display format.
 * @param [defaultValue=""] Default value to return.
 * @returns DateTime format.
 */
export const formatDate = (
  value?: DateType,
  as = DateFormat.dmyhm,
  defaultValue = ''
) => {
  const date = getDate(value)
  return date ? format(date, as) : defaultValue
}

/**
 * Returns date for specific time.
 * @param value Time (HH:mm).
 * @param [date] Date.
 * @returns Date.
 */
export const setTime = (value: string, date?: Date) => {
  const [h, m] = value.split(':')

  let d = startOfDay(date || new Date())
  d = setHours(d, Number(h))
  d = setMinutes(d, Number(m))

  return d
}

/**
 * Returns time (HH:mm) for the given date.
 * @param value Date.
 * @param [defaultValue="00:00"] Default value to return.
 * @returns Time.
 */
export const getTime = (value?: Date, defaultValue = '00:00') => {
  return value ? format(value, 'HH:mm') : defaultValue
}
