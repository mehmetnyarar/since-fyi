/**
 * Policy type.
 */
export type PolicyType = 'privacy'

/**
 * Drawer navigation parameters.
 */
export type DrawerNavigationParams = {
  Main: undefined
  About: undefined
  Policy: {
    type: PolicyType
  }
  Settings: undefined
}

/**
 * Main navigation parameters.
 */
export type MainNavigationParams = {
  Home: undefined
  Event: {
    id?: string // parameter for existing event
    title?: string // parameter for new events
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

/**
 * Params for the initial screen.
 */
export type InitialParams = Record<string, unknown>

/**
 * Navigator props.
 */
export interface NavigatorProps {
  initialScreen?: InitialScreen
  initialParams?: InitialParams
}
