import { rollup } from "@boardgames/devtools"

export default rollup({
  declaration: true,
  dependencies: ["@boardgames/common", "@boardgames/utils"],
  exclude: ["src/**/*.test.ts"],
  preserveModules: true,
})
