import { getSelectOptions } from './utility'

/**
 * Options for {Schedule.on}.
 */
export const ON_OPTIONS = getSelectOptions(
  {
    MINUTE: { length: 0 },
    HOUR: { length: 0 },
    DAY: { length: 0 },
    WEEK: { length: 7 },
    MONTH: { length: 31 },
    YEAR: { length: 365 }
  },
  'ON'
)
