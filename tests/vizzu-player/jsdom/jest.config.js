const config = {
  rootDir: '../../../',
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: '.coverage',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  coveragePathIgnorePatterns: ['assets', 'node_modules'],
  testEnvironment: 'jsdom',
  testMatch: ['**/vizzu-player/jsdom/*.test.js'],
  transform: {},
  moduleNameMapper: {
    'https://cdn.jsdelivr.net/npm/vizzu@0.8/dist/vizzu.min.js': '../tests/assets/mocks/vizzu-cdn.js'
  }
}

export default config
