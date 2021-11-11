module.exports = {
  "**/*.ts": filenames => [
    `yarn format ${filenames.join(" ")}`,
    `yarn lint:fix ${filenames.join(" ")}`,
    "yarn typecheck",
  ],
}
