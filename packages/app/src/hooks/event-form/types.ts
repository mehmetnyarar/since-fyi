/**
 * Configuration to create option values.
 */
export interface OptionsConfig {
  length: number
  transform?: (value: number) => number
  extra?: number[]
}
