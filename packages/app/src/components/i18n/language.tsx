import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '~/i18n'
import { SelectOption } from '~/types'
import { Box, PickerInput, Typography } from '~/ui'

/**
 * <LanguageSwitcher /> props.
 */
interface Props {
  debug?: boolean
}

/**
 * Language switcher.
 * @returns <LanguageSwitcher />.
 */
export const LanguageSwitcher: React.FC<Props> = ({ debug }) => {
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
    <>
      <PickerInput
        text={t(`LANGUAGE.${i18n.language}`)}
        options={options}
        value={i18n.language}
        onChange={handleChange as never}
        accessibilityLabel={t('language.a11y')}
        dialogProps={{ title: t('language') }}
        pickerProps={{
          accessibilityLabel: t('language.pick'),
          testID: 'LanguagePicker'
        }}
      />
      {debug && (
        <Box padding={16} testID='DebugLanguage'>
          <Typography textAlign='center'>{t('_test')}</Typography>
        </Box>
      )}
    </>
  )
}
