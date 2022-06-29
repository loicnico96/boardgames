import cleanOutDir from "rollup-plugin-delete"
import typescript from "rollup-plugin-typescript2"

export default {
  external: ["path", "rollup-plugin-delete", "rollup-plugin-typescript2"],
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/esm/index.js",
      format: "esm",
    },
  ],
  plugins: [
    cleanOutDir({
      targets: "dist",
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declarationDir: "dist/types",
          declaration: true,
        },
      },
    }),
  ],
}
