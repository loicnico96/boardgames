const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  future: { webpack5: true },
  poweredByHeader: false,
  reactStrictMode: true
});
