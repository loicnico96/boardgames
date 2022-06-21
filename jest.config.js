module.exports = {
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coverageReporters: ["html", "text-summary"],
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
}
