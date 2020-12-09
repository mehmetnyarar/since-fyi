import {
  getAvailablePresets,
  getDayOptions,
  getEveryOptions,
  getFrequencyOptions,
  getMonthOptions,
  getOptionValues,
  getPresetOptions,
  isFrequencyAvailable
} from '~/hooks/event-form/utility'
import { Frequency, PRESETS } from '~/models'

describe('hooks/event-form/utility', () => {
  it('should determine the frequency availability', () => {
    expect(isFrequencyAvailable(Frequency.MINUTE)).toBeTruthy()
    expect(isFrequencyAvailable(Frequency.HOUR)).toBeTruthy()
    expect(isFrequencyAvailable(Frequency.DAY)).toBeTruthy()
    expect(isFrequencyAvailable(Frequency.WEEK)).toBeTruthy()
    expect(isFrequencyAvailable(Frequency.MONTH)).toBeTruthy()
    expect(isFrequencyAvailable(Frequency.YEAR)).toBeTruthy()
  })

  it('should return the available presets', () => {
    expect(getAvailablePresets()).toHaveLength(PRESETS.length)
  })

  it('should return the preset options', () => {
    expect(getPresetOptions()).toHaveLength(PRESETS.length + 1)
  })

  it('should return the frequency options', () => {
    const frequencies = Object.values(Frequency)
    expect(getFrequencyOptions()).toHaveLength(frequencies.length)
  })

  it('should return option values', () => {
    expect(getOptionValues({ length: 3 })).toEqual([1, 2, 3])
    expect(
      getOptionValues({ length: 2, transform: value => value * 15 })
    ).toEqual([15, 30])
    expect(getOptionValues({ length: 1, extra: [3, 5] })).toEqual([1, 3, 5])
  })

  it('should return select options for every', () => {
    expect(getEveryOptions(Frequency.MINUTE)).toHaveLength(59)
    expect(getEveryOptions(Frequency.HOUR)).toHaveLength(23)
    expect(getEveryOptions(Frequency.DAY)).toHaveLength(30)
    expect(getEveryOptions(Frequency.WEEK)).toHaveLength(3)
    expect(getEveryOptions(Frequency.MONTH)).toHaveLength(11)
    expect(getEveryOptions(Frequency.YEAR)).toHaveLength(1)
  })

  it('should return month options', () => {
    expect(getMonthOptions(Frequency.YEAR)).toHaveLength(12)
    expect(getMonthOptions(Frequency.MONTH)).toHaveLength(0)
  })

  it('should return day options', () => {
    expect(getDayOptions(Frequency.YEAR)).toHaveLength(31)
    expect(getDayOptions(Frequency.MONTH)).toHaveLength(31)
    expect(getDayOptions(Frequency.WEEK)).toHaveLength(7)
    expect(getDayOptions(Frequency.DAY)).toHaveLength(0)
  })
})
