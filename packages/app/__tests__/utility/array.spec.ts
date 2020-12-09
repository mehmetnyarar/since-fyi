import { ArrayUtils } from '~/utility/array'

const array = ['tom waits', 'leonard cohen', 'beyonce', 'marty friedman']

describe('utility/array', () => {
  it('should replace an item', () => {
    expect(ArrayUtils.replace(array, 2, 'bob dylan')).toEqual([
      'tom waits',
      'leonard cohen',
      'bob dylan',
      'marty friedman'
    ])
  })

  it('should remove an item', () => {
    expect(ArrayUtils.remove(array, 2)).toEqual([
      'tom waits',
      'leonard cohen',
      'marty friedman'
    ])
  })
})
