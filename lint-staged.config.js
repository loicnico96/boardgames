module.exports = {
  "src/**/*.{ts,tsx}": filenames => [
    `yarn format ${filenames.join(" ")}`,
    `yarn lint:fix ${filenames.join(" ")}`,
    "yarn typecheck",
  ],
  "**/*.{js,json,yml}": filenames => [`yarn format ${filenames.join(" ")}`],
}
