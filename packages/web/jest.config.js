module.exports = {
  collectCoverageFrom: ["**/*.{ts,tsx}"],
  coverageReporters: ["html", "text-summary"],
  moduleNameMapper: {
    "^pages(.*)$": "<rootDir>/src/pages$1",
  },
  testEnvironment: "jsdom",
}
