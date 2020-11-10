import { DEFAULT_PRESETS, Frequency } from '~/models'
import { SelectOption } from '~/types'
import { OptionsSettings, OptionValuesConfig, SelectOptions } from './types'

/**
 * Creates select options for {Notification.preset}.
 * @param userDefined User-defined presets.
 * @returns Select options.
 */
export const getPresetOptions = (
  userDefined: string[] = []
): SelectOption[] => {
  const all = [...userDefined, ...DEFAULT_PRESETS]

  return all.map(preset => ({
    label: preset,
    value: preset
  }))
}

/**
 * Creates select options for {Notification.frequency}.
 * @returns Select options.
 */
export const getFrequencyOptions = () => {
  return Object.values(Frequency).map(frequency => ({
    label: frequency,
    value: frequency
  }))
}

/**
 * Creates option values.
 * @param config Config.
 * @returns Option values.
 */
export const getOptionValues = (config: OptionValuesConfig) => {
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
 * Creates a select option.
 * @param frequency Frequency.
 * @param value Value.
 * @param [prefix] Label prefix.
 */
export const getSelectOption = (
  frequency: Frequency,
  value: number,
  prefix?: string
): SelectOption => {
  return {
    label: prefix ? `${prefix}_${frequency}_${value}` : `${frequency}_${value}`,
    value
  }
}

/**
 * Creates select options.
 * @param settings Settings.
 * @param [prefix] Label prefix.
 * @returns Select options.
 */
export const getSelectOptions = (
  settings: OptionsSettings,
  prefix?: string
): SelectOptions => {
  const options = Object.values(Frequency).reduce((obj, frequency) => {
    const setting = settings[frequency]
    const values = getOptionValues(setting)

    obj[frequency] = values.map(value => {
      return getSelectOption(frequency, value, prefix)
    })

    return obj
  }, {} as Partial<SelectOptions>)

  return options as SelectOptions
}
