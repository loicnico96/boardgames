const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

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
    "../src/**/stories.tsx",
  ],
  typescript: {
    check: true,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          // Support for ThemeProvider from emotion v11
          // See https://github.com/storybookjs/storybook/pull/13300
          "@emotion/react": "@emotion/react",
          "@emotion/styled": "@emotion/styled",
        },
        plugins: [
          ...config.resolve.plugins,
          // Support for Typescript absolute imports
          new TsconfigPathsPlugin(),
        ],
      },
    }
  }
}
