const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  projects: [
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
    },
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
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/app.tsx',
    '!<rootDir>/src/navigation/**/*.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75
    }
  }
}
