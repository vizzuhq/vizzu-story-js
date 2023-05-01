export default {
  rootDir: ".",
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  coveragePathIgnorePatterns: ["assets"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["assets"],
  transform: {},
};
