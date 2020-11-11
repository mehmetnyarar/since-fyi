import { BackendModule } from 'i18next'

/**
 * i18n backend plugin.
 */
export const Backend: BackendModule = {
  type: 'backend',
  init: (services, backendOptions, i18nextOptions) => {
    console.debug('Backend/init', {
      services,
      backendOptions,
      i18nextOptions
    })
  },
  read: (language, namespace, callback) => {
    console.debug('Backend/read', {
      language,
      namespace,
      callback
    })
  },
  create: (languages, namespace, key, fallbackValue) => {
    console.debug('Backend/create', {
      languages,
      namespace,
      key,
      fallbackValue
    })
  },
  save: (language, namespace, data) => {
    console.debug('Backend/save', {
      language,
      namespace,
      data
    })
  }
}
