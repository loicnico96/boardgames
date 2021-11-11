import { rollup } from "@boardgames/devtools"

export default rollup({
  declaration: true,
  dependencies: [
    "@boardgames/common",
    "@boardgames/utils",
    "immutability-helper"
  ],
  exclude: [
    "src/**/*.test.ts",
    "test/**/*.ts",
  ],
})
