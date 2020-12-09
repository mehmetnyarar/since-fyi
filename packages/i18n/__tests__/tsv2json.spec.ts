import fs, { writeJson } from 'fs-extra'
import { tsv2json } from '~/convert/tsv2json'

jest.mock('fs-extra', () => {
  const actual = jest.requireActual('fs-extra')

  return {
    ...actual,
    ensureDir: jest.fn(),
    writeJson: jest.fn()
  }
})

const tsv = {
  noData: '',
  noNamespace: ['usage\tnamespace\tkey\ten\tru\r\n'].join(),
  noLanguage: ['usage\tnamespace\tkey\r\n', '*\tcommon\ttest\r\n'].join(),
  ok: [
    'usage\tnamespace\tkey\ten\tru\r\n',
    '*\tcommon\ttest\ttest-en\ttest-ru\r\n',
    '*\tcommon\ttest2\ttest2-en\ttest2-ru\r\n'
  ].join()
}

describe('tsv2json', () => {
  it('should fail to convert (no data)', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation(async () => {
      return tsv.noData as never
    })

    await expect(tsv2json).rejects.toThrow()
  })

  it('should fail to convert (no namespaces)', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation(async () => {
      return tsv.noNamespace as never
    })

    await expect(tsv2json).rejects.toThrow()
  })

  it('should fail to convert (no languages)', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation(async () => {
      return tsv.noLanguage as never
    })

    await expect(tsv2json).rejects.toThrow()
  })

  it('should convert tsv to json', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation(async () => {
      return tsv.ok as never
    })

    await tsv2json()
    expect(writeJson).toHaveBeenCalledTimes(2)
  })
})
