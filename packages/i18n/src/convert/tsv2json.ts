import { ensureDir, readFile, writeJson } from 'fs-extra'
import { join } from 'path'
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
 * Languages.
 * - key: language
 * - value: translations
 */
interface Languages {
  [key: string]: Translations
}

/**
 * Locales.
 * - key: namespace
 * - value: languages
 */
interface Locales {
  [key: string]: Languages
}

/**
 * Source file.
 * Must be in the following format:
 * - usage
 * - namespace
 * - key
 * - other columns represent translation per language
 */
const NAMESPACE_INDEX = 1
const KEY_INDEX = 2
const TRANSLATIONS_INDEX = 3

/**
 * Determines the namespaces that are used for translations.
 * @param data Data.
 * @returns Namespaces.
 */
const getNamespaces = (data: string[]) => {
  return data.reduce<string[]>((result, item, index) => {
    if (!item) return result
    if (!index) return result

    const parts = item.split(/\t/)
    const value = parts[NAMESPACE_INDEX]
    return result.includes(value) ? result : result.concat(value)
  }, [])
}

/**
 * Determines the languages that are used for translations.
 * @param data Data.
 * @returns Languages.
 */
const getLanguages = (data: string[]) => {
  const columns = data[0].split(/\t/)
  return columns.reduce<string[]>((result, column, index) => {
    return index < TRANSLATIONS_INDEX ? result : result.concat(column)
  }, [])
}

/**
 * Converts TSV file to JSON.
 */
export const tsv2json = async () => {
  const text = await readFile(LOCALES_TSV, { encoding: 'utf-8' })
  const lines = text.split(/\r\n|\r|\n/)
  if (lines.length < 2) throw new Error('Invalid data!')

  const namespaces = getNamespaces(lines)
  if (!namespaces.length) throw new Error('No namespace found!')

  const languages = getLanguages(lines)
  if (!languages.length) throw new Error('No language found!')

  const locales: Locales = {}
  for (const namespace of namespaces) {
    locales[namespace] = {}

    for (const language of languages) {
      locales[namespace][language] = {}
    }
  }

  for (let row = 1; row < lines.length; row++) {
    if (lines[row]) {
      const data = lines[row].split(/\t/)
      const namespace = data[NAMESPACE_INDEX]
      const key = data[KEY_INDEX]

      for (let column = TRANSLATIONS_INDEX; column < data.length; column++) {
        const language = languages[column - TRANSLATIONS_INDEX]
        const translation = data[column]
        locales[namespace][language][key] = translation
      }
    }
  }

  await ensureDir(LOCALES_DIR)

  for (const language of languages) {
    const languageDir = join(LOCALES_DIR, language)
    await ensureDir(languageDir)

    for (const namespace of namespaces) {
      const output = join(languageDir, `${namespace}.json`)
      const translations = locales[namespace][language]
      await writeJson(output, translations, { spaces: 2 })
    }
  }
}
