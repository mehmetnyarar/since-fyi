import { readdir, writeFile } from 'fs-extra'
import { basename } from 'path'
import { json2tsv } from '~/convert/json2tsv'

const localesDir = ['en', 'ru', 'index.ts']
const localeDir = ['common.json', 'index.ts']
const json = { test: 'message' }

jest.mock('fs-extra', () => {
  const actual = jest.requireActual('fs-extra')

  return {
    ...actual,
    ensureDir: jest.fn(),
    readdir: jest.fn().mockImplementation(async (dir: string) => {
      const name = basename(dir)
      return name === 'locales' ? localesDir : localeDir
    }),
    readJson: jest.fn().mockImplementation(async () => {
      return json
    }),
    writeFile: jest.fn()
  }
})

describe('json2tsv', () => {
  it('should convert from json to tsv', async () => {
    await json2tsv()

    expect(readdir).toHaveBeenCalledTimes(3)

    const lines = [
      'usage\tnamespace\tkey\ten\tru\r\n',
      '*\tcommon\ttest\tmessage\tmessage\r\n'
    ]
    const options = { encoding: 'utf-8' }

    expect(writeFile).toHaveBeenCalledWith(
      expect.stringMatching(/locales.tsv/),
      lines,
      options
    )
  })
})
