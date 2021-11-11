import { rollup } from "@boardgames/devtools"

export default rollup({
  declaration: true,
  dependencies: [
    "@boardgames/utils",
    "immutability-helper"
  ],
  exclude: [
    "src/**/*.test.ts",
  ],
})
