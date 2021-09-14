module.exports = {
  env: {
    browser: true,
  },
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/react-in-jsx-scope": ["off"],
    "react-hooks/exhaustive-deps": ["error"],
    "react-hooks/rules-of-hooks": ["error"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
