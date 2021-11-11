module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ],
  coverageReporters: [
    "html",
    "text-summary",
  ],
  moduleNameMapper: {
    "^Components(.*)$": "<rootDir>/src/Components$1",
    "^test-utils(.*)$": "<rootDir>/src/test-utils$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
  testEnvironment: "jsdom"
}
