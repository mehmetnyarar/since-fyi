import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  useIsDrawerOpen
} from '@react-navigation/drawer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '~/theme'
import { Icon, Pressable, VBox } from '~/ui'

/**
 * &lt;Menu /> props.
 */
interface Props extends DrawerContentComponentProps<DrawerContentOptions> {}

/**
 * Drawer menu.
 * @param props Props
 * @returns &lt;Menu />.
 */
export const Menu: React.FC<Props> = props => {
  const { navigate } = props.navigation

  const { t } = useTranslation()
  const { colors } = useTheme()

  const isDrawerOpen = useIsDrawerOpen()
  if (!isDrawerOpen) return null

  return (
    <VBox
      flex={1}
      paddingVertical={64}
      justifyContent='space-between'
      accessible
      accessibilityRole='menu'
      accessibilityLabel={t('menu')}
    >
      <Pressable
        variant='basic'
        appearance='transparent'
        text={t('home')}
        onPress={() => navigate('Home')}
        justifyContent='flex-start'
        paddingHorizontal={16}
        accessibilityHint={t('home.hint')}
        accessibilityLabel={t('home')}
      >
        <Icon
          name='home-outline'
          size={16}
          color={colors.text}
          marginRight={8}
        />
      </Pressable>
      <VBox>
        <Pressable
          text={t('about')}
          onPress={() => navigate('About')}
          justifyContent='flex-start'
          paddingHorizontal={16}
          accessibilityHint={t('about.hint')}
          accessibilityLabel={t('about')}
        >
          <Icon
            name='information-outline'
            size={16}
            color={colors.text}
            marginRight={8}
          />
        </Pressable>
        <Pressable
          text={t('policy.privacy')}
          onPress={() => navigate('Policy', { type: 'privacy' })}
          justifyContent='flex-start'
          paddingHorizontal={16}
          accessibilityHint={t('policy.privacy.hint')}
          accessibilityLabel={t('policy.privacy')}
        >
          <Icon
            name='shield-alert-outline'
            size={16}
            color={colors.text}
            marginRight={8}
          />
        </Pressable>
        <Pressable
          variant='basic'
          appearance='transparent'
          text={t('settings')}
          onPress={() => navigate('Settings')}
          justifyContent='flex-start'
          paddingHorizontal={16}
          accessibilityHint={t('settings.hint')}
          accessibilityLabel={t('settings')}
        >
          <Icon
            name='settings-outline'
            size={16}
            color={colors.text}
            marginRight={8}
          />
        </Pressable>
      </VBox>
    </VBox>
  )
}
