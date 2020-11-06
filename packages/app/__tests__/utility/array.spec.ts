import { ArrayUtils } from '~/utility/array'

describe('utility/array', () => {
  it('should replace the item', () => {
    const array = ['tom waits', 'leonard cohen', 'beyonce', 'marty friedman']

    const result = ArrayUtils.replace(array, 2, 'bob dylan')
    expect(result).toEqual([
      'tom waits',
      'leonard cohen',
      'bob dylan',
      'marty friedman'
    ])
  })
})
