import { rollup } from "@boardgames/devtools"

export default rollup({
  declaration: true,
  dependencies: [
    "seedrandom"
  ],
})
