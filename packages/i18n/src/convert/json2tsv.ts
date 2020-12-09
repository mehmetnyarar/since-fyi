import { ensureDir, readdir, readJson, writeFile } from 'fs-extra'
import { basename, join } from 'path'
import { LOCALES_DIR, LOCALES_TSV } from './const'

/**
 * Translations.
 * - key: language
 * - value: translation
 */
interface Translations {
  [key: string]: string
}

/**
 * Represents a row data in tsv.
 */
interface Item extends Translations {
  usage: string
  namespace: string
  key: string
}

/**
 * Converts JSON to TSV.
 */
export const json2tsv = async () => {
  await ensureDir(LOCALES_DIR)
  const sourceDirItems = await readdir(LOCALES_DIR)

  if (!sourceDirItems) return

  const languages = sourceDirItems.filter(i => !/.ts/.test(i))
  const data: Item[] = [
    {
      usage: 'usage',
      namespace: 'namespace',
      key: 'key',
      ...languages.reduce<Translations>(
        (result, language) => ({
          ...result,
          [language]: language
        }),
        {}
      )
    }
  ]

  for (const language of languages) {
    const languageDir = join(LOCALES_DIR, language)
    const languageDirItems = await readdir(languageDir)
    const fileNames = languageDirItems.filter(i => /.json/.test(i))

    for (const fileName of fileNames) {
      const namespace = basename(fileName, '.json')

      const file = join(languageDir, fileName)
      const json: Record<string, string> = await readJson(file)
      const keys = Object.keys(json)
      const itemCount = keys.length + 1

      let rowIndex = 1
      for (const key of keys) {
        if (data.length < itemCount) {
          data.push({
            usage: '*',
            namespace,
            key,
            [language]: json[key]
          })
        } else {
          const item: Item = Object.assign(data[rowIndex])
          data[rowIndex] = Object.assign({}, item, {
            [language]: json[key]
          })
        }
        rowIndex++
      }
    }
  }

  const items = data.map(item => Object.values(item).join('\t'))
  const lines = items.map(item => item.concat('\r\n'))
  await writeFile(LOCALES_TSV, lines, { encoding: 'utf-8' })
}
