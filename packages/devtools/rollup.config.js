import cleanOutDir from "rollup-plugin-delete"
import typescript from "rollup-plugin-typescript2"

export default {
  external: [
    "path",
    "rollup-plugin-delete",
    "rollup-plugin-typescript2"
  ],
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    }
  ],
  plugins: [
    cleanOutDir({
      targets: "dist",
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
      },
    }),
  ]
}
