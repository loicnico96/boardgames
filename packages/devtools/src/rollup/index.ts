import { posix } from "path"
import { RollupOptions } from "rollup"
import cleanOutDir from "rollup-plugin-delete"
import typescript from "rollup-plugin-typescript2"

export enum BuildFormat {
  CJS = "cjs",
  ESM = "esm",
}

export type BuildOptions = {
  // External dependencies
  dependencies?: string[]
  // Input options
  inputDir?: string
  // Output options
  outputDir?: string
  formats?: BuildFormat[]
  sourcemap?: boolean
  // Typescript config overrides
  declaration?: boolean
  exclude?: string[]
  include?: string[]
}

export function rollup({
  declaration = false,
  dependencies,
  exclude,
  formats = [BuildFormat.CJS, BuildFormat.ESM],
  include,
  inputDir = "src",
  outputDir = "dist",
  sourcemap = false,
}: BuildOptions): RollupOptions {
  return {
    external: dependencies,
    input: posix.join(inputDir, "index.ts"),
    output: formats.map(format => ({
      file: posix.join(outputDir, `index.${format}.js`),
      sourcemap,
      format,
    })),
    plugins: [
      cleanOutDir({
        targets: outputDir,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration,
          },
          exclude,
          include,
        },
      }),
    ],
  }
}
