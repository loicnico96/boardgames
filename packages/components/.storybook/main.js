module.exports = {
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
  ],
  features: {
    postcss: false,
  },
  stories: [
    "../src/**/*.stories.tsx",
  ],
}
