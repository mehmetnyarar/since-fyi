import {
  DateFormat,
  formatDate,
  getDate,
  getDateFormat,
  getTime,
  setTime
} from '~/utility/date'

let date = new Date(2020, 10, 10, 9, 5, 0, 0)

describe('utility/date', () => {
  it('should return date', () => {
    expect(getDate()).toBeUndefined()
    expect(getDate(date)).toEqual(date)
    expect(getDate(date.toISOString())).toEqual(date)
    expect(getDate(date.getTime())).toEqual(date)
  })

  it('should return date format', () => {
    expect(getDateFormat()).toBe(DateFormat.dmyhm)
    expect(getDateFormat('date')).toBe(DateFormat.dmy)
    expect(getDateFormat('time')).toBe(DateFormat.hm)
    expect(getDateFormat('datetime')).toBe(DateFormat.dmyhm)
  })

  it('should return the formatted date', () => {
    expect(formatDate()).toBe('')
    expect(formatDate(date)).toBe('10.11.2020 09:05')
    expect(formatDate(date, DateFormat.dmy)).toBe('10.11.2020')
    expect(formatDate(date, DateFormat.hm)).toBe('09:05')
    expect(formatDate(date, DateFormat.dmyhm)).toBe('10.11.2020 09:05')
  })

  it('should set the time', () => {
    date = setTime('21:05', date)
    expect(date).toEqual(new Date(2020, 10, 10, 21, 5))
  })

  it('should get the time', () => {
    expect(getTime()).toBe('00:00')
    expect(getTime(date)).toBe('21:05')
  })
})
