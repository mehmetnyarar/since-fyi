import { Frequency } from '~/models'
import { SelectOption } from '~/types'

/**
 * Configuration to create option values.
 */
export interface OptionValuesConfig {
  length: number
  transform?: (value: number) => number
  extra?: number[]
}

/**
 * Options settings per frequency.
 */
export type OptionsSettings = { [K in Frequency]: OptionValuesConfig }

/**
 * Select options per frequency.
 */
export type SelectOptions = { [K in Frequency]: SelectOption[] }
