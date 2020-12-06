import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  useIsDrawerOpen
} from '@react-navigation/drawer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '~/theme'
import { Icon, Pressable, VBox } from '~/ui'

const routes = [
  { id: 'about', route: 'About', icon: 'information-outline' },
  {
    id: 'policy.privacy',
    route: 'Policy',
    params: { type: 'privacy' },
    icon: 'shield-alert-outline'
  },
  { id: 'settings', route: 'Settings', icon: 'settings-outline' }
]

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
        {routes.map(({ id, route, params, icon }, index) => (
          <Pressable
            key={index}
            variant='basic'
            appearance='transparent'
            text={t(id)}
            onPress={() => navigate(route, params)}
            justifyContent='flex-start'
            paddingHorizontal={16}
            accessibilityHint={t(`${id}.hint`)}
            accessibilityLabel={t(id)}
          >
            <Icon name={icon} size={16} color={colors.text} marginRight={8} />
          </Pressable>
        ))}
      </VBox>
    </VBox>
  )
}
