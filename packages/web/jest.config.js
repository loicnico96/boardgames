module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ],
  coverageReporters: [
    "html",
    "text-summary",
  ],
  moduleNameMapper: {
    ".+\\.(css|png|jpg)$": "<rootDir>/test/utils/fileMock.js",
    "^assets(.*)$": "<rootDir>/src/assets/$1",
    "^components(.*)$": "<rootDir>/src/components/$1",
    "^config(.*)$": "<rootDir>/src/config/$1",
    "^hooks(.*)$": "<rootDir>/src/hooks/$1",
    "^lib(.*)$": "<rootDir>/src/lib/$1",
    "^pages(.*)$": "<rootDir>/src/pages/$1",
  },
  setupFiles: [
    "<rootDir>/test/setupTest.js",
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          "next/babel"
        ]
      }
    ]
  }
}
