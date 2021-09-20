import typescript from "rollup-plugin-typescript2"
import ttypescript from "ttypescript"
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
        typescript: ttypescript,
        tsconfigOverride: {
          compilerOptions: {
            declaration: options.types ?? false,
          },
          exclude: [
            "src/**/stories.ts",
            "src/**/stories.tsx",
            "src/**/*.test.ts",
            "src/**/*.test.tsx",
            "src/test-utils",
            "src/utils/storybook",
          ]
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
    dependencies: [
      "@emotion/react",
      "@emotion/styled",
      "react",
      "react/jsx-runtime",
      "react-dom"
    ],
    sourcemap: true,
    types: true,
  }
)
