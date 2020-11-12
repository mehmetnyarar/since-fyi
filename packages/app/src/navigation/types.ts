/**
 * Drawer navigation parameters.
 */
export type DrawerNavigationParams = {
  Main: undefined
  About: undefined
  Policy: {
    type: 'privacy'
  }
  Settings: undefined
}

/**
 * Main navigation parameters.
 */
export type MainNavigationParams = {
  Home: undefined
  Event: {
    id?: string
  }
}

/**
 * Application screen.
 */
export type AppScreen =
  | 'Main'
  | 'Home'
  | 'Event'
  | 'About'
  | 'Policy'
  | 'Settings'

/**
 * Initial screen to show.
 */
export type InitialScreen = Exclude<AppScreen, 'Home' | 'Event'>
