const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack(config, { dev }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      api: path.resolve(__dirname, "api"),
      components: path.resolve(__dirname, "components"),
      hooks: path.resolve(__dirname, "hooks"),
      lib: path.resolve(__dirname, "lib"),
      pages: path.resolve(__dirname, "pages"),
      styles: path.resolve(__dirname, "styles"),
    };

    return config;
  },
});
