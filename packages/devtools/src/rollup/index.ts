import { posix } from "path"
import { RollupOptions } from "rollup"
import cleanOutDir from "rollup-plugin-delete"
import typescript from "rollup-plugin-typescript2"

export type BuildOptions = {
  // External dependencies
  dependencies?: string[]
  inputDir?: string
  // Output options
  outputDir?: string
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
  include,
  inputDir = "src",
  outputDir = "dist",
  sourcemap,
}: BuildOptions): RollupOptions {
  return {
    external: dependencies,
    input: posix.join(inputDir, "index.ts"),
    output: [
      {
        file: posix.join(outputDir, "index.js"),
        format: "cjs",
        sourcemap,
      },
      {
        dir: posix.join(outputDir, "esm"),
        format: "esm",
        preserveModules: true,
        sourcemap,
      },
    ],
    plugins: [
      cleanOutDir({
        targets: outputDir,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration,
            declarationDir: posix.join(outputDir, "types"),
          },
          exclude,
          include,
        },
        useTsconfigDeclarationDir: true,
      }),
    ],
  }
}
