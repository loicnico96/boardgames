import { rollup } from "@boardgames/devtools"

export default rollup({
  declaration: true,
  dependencies: [
    "@emotion/react",
    "@emotion/styled",
    "react",
    "react/jsx-runtime",
    "react-dom",
  ],
  exclude: [
    "src/**/stories.ts",
    "src/**/stories.tsx",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/storybook",
    "src/test-utils",
  ],
})
