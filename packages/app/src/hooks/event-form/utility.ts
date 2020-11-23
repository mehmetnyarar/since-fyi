import { Frequency, FREQUENCY_AVAILABILITY, PRESETS } from '~/models'
import { SelectOption } from '~/ui'
import { OptionsConfig } from './types'

/**
 * Determines whether a frequency is available to use or not.
 * @param frequency Frequency.
 * @returns True if the condition is met.
 */
export const isFrequencyAvailable = (frequency: Frequency) => {
  return FREQUENCY_AVAILABILITY.includes(frequency)
}

/**
 * Filters out the available presets.
 * @returns Presets.
 */
export const getAvailablePresets = () => {
  return PRESETS.filter(({ frequency }) => isFrequencyAvailable(frequency))
}

/**
 * Creates preset options.
 * @returns Preset options.
 */
export const getPresetOptions = () => {
  return getAvailablePresets()
    .map<SelectOption>(({ frequency, every }) => ({
      label: `PRESET.${frequency}.${every}`,
      value: `${frequency}.${every}`
    }))
    .concat({
      label: 'PRESET.CUSTOM',
      value: 'CUSTOM'
    })
}

/**
 * Creates select options for {Notification.frequency}.
 * @returns SelectOptions.
 */
export const getFrequencyOptions = () => {
  return Object.values(Frequency)
    .filter(isFrequencyAvailable)
    .map(frequency => ({
      label: `FREQUENCY.${frequency}`,
      value: frequency
    }))
}

/**
 * Creates option values.
 * @param config Config.
 * @returns Option values.
 */
export const getOptionValues = (config: OptionsConfig) => {
  const { length, transform, extra } = config

  const options = length
    ? Array.from({ length }, (_, i) => {
        const value = i + 1
        return transform ? transform(value) : value
      })
    : []

  return extra ? options.concat(extra) : options
}

/**
 * Creates select options for {Reminder.every} based on configuration.
 * @param options Options.
 * @returns SelectOptions.
 */
export const getEverySelectOptions = (options: OptionsConfig) => {
  return getOptionValues(options).map<SelectOption>(value => ({
    label: String(value),
    value
  }))
}

/**
 * Creates select options for {Reminder.every} based on given frequeny.
 * @param frequency Frequency.
 * @returns SelectOptions.
 */
export const getEveryOptions = (frequency: Frequency) => {
  switch (frequency) {
    case Frequency.MINUTE:
      return getEverySelectOptions({ length: 59 })
    case Frequency.HOUR:
      return getEverySelectOptions({ length: 23 })
    case Frequency.DAY:
      return getEverySelectOptions({ length: 30 })
    case Frequency.WEEK:
      return getEverySelectOptions({ length: 3 })
    case Frequency.MONTH:
      return getEverySelectOptions({ length: 11 })
    case Frequency.YEAR:
      return getEverySelectOptions({ length: 1 })
  }
}

/**
 * Creates select options for {Schedule.on}.
 * @param frequency Frequency.
 * @param value Value.
 * @returns SelectOptions.
 */
export const getScheduleOptions = (frequency: Frequency, length: number) => {
  return getOptionValues({ length }).map<SelectOption>(value => ({
    label: `SCHEDULE.${frequency}.${value}`,
    value
  }))
}

/**
 * Creates select options for {Schedule.month}.
 * @param [frequency] Frequency.
 * @returns SelectOptions.
 */
export const getMonthOptions = (frequency?: Frequency) => {
  return frequency && frequency === Frequency.YEAR
    ? getScheduleOptions(Frequency.YEAR, 12)
    : []
}

/**
 * Creates select options for {Schedule.day}.
 * @param [frequency] Frequency.
 * @returns SelectOptions.
 */
export const getDayOptions = (frequency?: Frequency) => {
  if (!frequency) return []

  return frequency === Frequency.WEEK
    ? getScheduleOptions(Frequency.WEEK, 7)
    : [Frequency.MONTH, Frequency.YEAR].includes(frequency)
        ? getScheduleOptions(Frequency.MONTH, 31)
        : []
}
