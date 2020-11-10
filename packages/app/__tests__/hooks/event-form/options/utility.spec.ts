import {
  getFrequencyOptions,
  getOptionValues,
  getPresetOptions,
  getSelectOption
} from '~/hooks/event-form/options'
import { DEFAULT_PRESETS, Frequency } from '~/models'

describe('hooks/event-form/options/utility', () => {
  it('should return notification presets', () => {
    let length = DEFAULT_PRESETS.length
    expect(getPresetOptions()).toHaveLength(length)

    const userPresets = ['MINUTE_40', 'DAY_5']

    length += userPresets.length
    expect(getPresetOptions(userPresets)).toHaveLength(length)
  })

  it('should return frequency options', () => {
    const length = Object.keys(Frequency).length
    expect(getFrequencyOptions()).toHaveLength(length)
  })

  it('should return option values', () => {
    let result = getOptionValues({ length: 0 })
    expect(result).toHaveLength(0)

    result = getOptionValues({ length: 10 })
    expect(result).toHaveLength(10)

    result = getOptionValues({ length: 2, transform: value => value * 15 })
    expect(result).toEqual([15, 30])

    result = getOptionValues({ length: 5, extra: [10, 20, 30] })
    expect(result).toEqual([1, 2, 3, 4, 5, 10, 20, 30])
  })

  it('should return select option', () => {
    expect(getSelectOption(Frequency.DAY, 1)).toEqual({
      label: 'DAY_1',
      value: 1
    })

    expect(getSelectOption(Frequency.DAY, 1, 'ON')).toEqual({
      label: 'ON_DAY_1',
      value: 1
    })
  })
})
