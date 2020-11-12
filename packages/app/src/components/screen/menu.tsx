import {
  DrawerContentComponentProps,
  DrawerContentOptions
} from '@react-navigation/drawer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '~/theme'
import { Icon, Pressable, VBox } from '~/ui'

/**
 * <Menu /> props.
 */
interface Props extends DrawerContentComponentProps<DrawerContentOptions> {}

/**
 * Drawer menu.
 * @param props Props
 * @returns <Menu />.
 */
export const Menu: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { navigate } = navigation

  return (
    <VBox flex={1} paddingVertical={64} justifyContent='space-between'>
      <Pressable
        variant='basic'
        appearance='transparent'
        text={t('home')}
        onPress={() => navigate('Home')}
        justifyContent='flex-start'
        paddingHorizontal={16}
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
