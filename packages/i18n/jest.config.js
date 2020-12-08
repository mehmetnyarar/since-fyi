module.exports = {
  projects: [
    {
      displayName: 'i18n:lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
      testPathIgnorePatterns: ['<rootDir>/coverage', '<rootDir>/lib']
    },
    {
      displayName: 'i18n:test',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/**/+(*.)+(spec|test).+(js|ts)?(x)'],
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1'
      },
      setupFilesAfterEnv: ['<rootDir>/test/setup.ts']
    }
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/const.ts'
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
