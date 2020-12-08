/**
 * Translations.
 * - key: translation key
 * - value: translation
 */
export interface Translations {
  [key: string]: string
}

/**
 * Namespaces.
 * - key: namespace
 * - value: translations
 */
export interface Namespaces {
  [key: string]: Translations
}

/**
 * Locales.
 * - key: language
 * - value: namespaces
 */
export interface Locales {
  [key: string]: Namespaces
}
