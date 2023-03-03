export default {
  rootDir: ".",
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  coverageProvider: "v8",
  coverageDirectory: ".coverage",
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
  moduleNameMapper: {
    "https://cdn.jsdelivr.net/npm/vizzu@0.6/dist/vizzu.min.js":
      "<rootDir>/src/__mocks__/vizzu.js",
  },
};
