const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  projects: [
    {
      displayName: 'app:lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: [
        '<rootDir>/__generated__',
        '<rootDir>/.expo',
        '<rootDir>/coverage',
        '<rootDir>/App.tsx'
      ]
    },
    {
      ...tsjPreset,
      displayName: 'app:test',
      preset: 'jest-expo',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/+(*.)+(spec|test).+(js|ts)?(x)'],
      transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
      ],
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
      globals: {
        'ts-jest': {
          babelConfig: true
        }
      },
      cacheDirectory: '.jest/cache'
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/const.ts',
    '!<rootDir>/src/**/enum.ts',
    '!<rootDir>/src/**/type.ts',
    '!<rootDir>/src/**/context.ts',
    '!<rootDir>/src/**/provider.tsx',
    '!<rootDir>/src/app.tsx',
    '!<rootDir>/src/i18n/i18n.ts',
    '!<rootDir>/src/navigation/*.{ts,tsx}',
    '!<rootDir>/src/theme/**/*.ts',
    '!<rootDir>/src/ui/**/*.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70
    }
  }
}
