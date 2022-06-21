const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  // https://github.com/wwayne/react-tooltip/issues/769#issuecomment-1144762754
  // reactStrictMode: true,
})
