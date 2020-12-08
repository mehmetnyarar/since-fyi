import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '~/i18n'
import { PickerInput, SelectOption } from '~/ui'

/**
 * &lt;LanguageSwitcher /> props.
 */
interface Props {}

/**
 * Language switcher.
 * @returns &lt;LanguageSwitcher />.
 */
export const LanguageSwitcher: React.FC<Props> = () => {
  const { t, i18n } = useTranslation()

  const options = useMemo(
    () =>
      LANGUAGES.map<SelectOption>(language => ({
        label: t(`LANGUAGE.${language}`),
        value: language
      })),
    [t]
  )

  const handleChange = useCallback(
    async (value: string) => {
      await i18n.changeLanguage(value)
    },
    [i18n]
  )

  return (
    <PickerInput
      options={options}
      value={i18n.language}
      onChange={handleChange as never}
      selectLabel={t('select')}
      accessibilityHint={t('language.hint')}
      accessibilityLabel={t('language')}
      dialogProps={{
        title: t('language'),
        cancelLabel: t('cancel'),
        confirmLabel: t('confirm')
      }}
      pickerProps={{
        accessibilityHint: t('language.pick.hint'),
        accessibilityLabel: t('language.pick')
      }}
    />
  )
}
