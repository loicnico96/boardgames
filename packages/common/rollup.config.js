import typescript from "rollup-plugin-typescript2"
import { posix } from "path"

const SRC_DIRECTORY = "src"
const OUTPUT_DIRECTORY = "dist"
const OUTPUT_FORMATS = ["cjs", "esm"]

function build(formats, inputDir, outputDir, options = {}) {
  return {
    external: options.dependencies,
    input: posix.join(inputDir, "index.ts"),
    output: formats.map(format => ({
      file: posix.join(outputDir, `index.${format}.js`),
      sourcemap: options.sourcemap ?? false,
      format,
    })),
    plugins: [
      ...options.plugins ?? [],
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: options.types ?? false,
          },
        },
      }),
    ]
  }
}

export default build(
  OUTPUT_FORMATS,
  SRC_DIRECTORY,
  OUTPUT_DIRECTORY,
  {
    dependencies: ["immutability-helper"],
    types: true,
  }
)
