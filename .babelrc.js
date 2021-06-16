module.exports = {
  plugins: ["@emotion"],
  presets:
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic"
        }
      }
  ],
}
