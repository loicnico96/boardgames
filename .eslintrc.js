module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "react",
    "react-hooks",
  ],
  rules: {
    "import/order": ["error", {
      "groups": [
        ["builtin", "external"],
        ["internal"],
        ["parent"],
        ["sibling", "index"]
      ],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true,
      }
    }],

    // TypeScript
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/method-signature-style": ["error", "property"],
    "@typescript-eslint/no-dynamic-delete": ["error"],
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/no-inferrable-types": ["error", {
      "ignoreParameters": true,
    }],
    "@typescript-eslint/no-invalid-void-type": ["error"],
    "@typescript-eslint/no-require-imports": ["error"],
    "@typescript-eslint/no-throw-literal": ["error"],
    "@typescript-eslint/prefer-enum-initializers": ["error"],
    "@typescript-eslint/prefer-for-of": ["error"],
    "@typescript-eslint/prefer-function-type": ["error"],
    "@typescript-eslint/prefer-includes": ["error"],
    "@typescript-eslint/prefer-literal-enum-member": ["error"],
    "@typescript-eslint/prefer-nullish-coalescing": ["error"],
    "@typescript-eslint/prefer-optional-chain": ["error"],
    "@typescript-eslint/prefer-readonly": ["error"],
    "@typescript-eslint/prefer-string-starts-ends-with": ["error"],
    "@typescript-eslint/prefer-ts-expect-error": ["error"],
    "@typescript-eslint/require-array-sort-compare": ["error"],
    "@typescript-eslint/strict-boolean-expressions": ["off"],
    "@typescript-eslint/switch-exhaustiveness-check": ["error"],

    // Typescript Overrides
    "@typescript-eslint/default-param-last": ["error"],
    "@typescript-eslint/dot-notation": ["error"],
    "@typescript-eslint/no-dupe-class-members": ["error"],
    "@typescript-eslint/no-duplicate-imports": ["error"],
    "@typescript-eslint/no-invalid-this": ["error"],
    "@typescript-eslint/no-loop-func": ["error"],
    "@typescript-eslint/no-loss-of-precision": ["error"],
    "@typescript-eslint/no-redeclare": ["error"],
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-expressions": ["error"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-use-before-define": ["warn"],
    "@typescript-eslint/no-useless-constructor": ["error"],
    "@typescript-eslint/return-await": ["error"],

    // Possible Errors
    "no-await-in-loop": ["warn"],
    "no-console": ["warn"],
    "no-promise-executor-return": ["error"],
    "no-unreachable-loop": ["error"],
    "require-atomic-updates": ["error"],

    // Best Practices
    "block-scoped-var": ["error"],
    "class-methods-use-this": ["error"],
    "consistent-return": ["error"],
    "curly": ["error", "all"],
    "default-case": ["error"],
    "default-case-last": ["error"],
    "eqeqeq": ["error", "always"],
    "no-alert": ["error"],
    "no-caller": ["error"],
    "no-constructor-return": ["error"],
    "no-eval": ["error"],
    "no-extend-native": ["error"],
    "no-extra-bind": ["error"],
    "no-extra-label": ["error"],
    "no-implied-eval": ["error"],
    "no-iterator": ["error"],
    "no-labels": ["error"],
    "no-lone-blocks": ["error"],
    "no-multi-str": ["error"],
    "no-new": ["error"],
    "no-new-func": ["error"],
    "no-new-wrappers": ["error"],
    "no-param-reassign": ["error"],
    "no-proto": ["error"],
    "no-restricted-syntax": ["error", "SequenceExpression"],
    "no-return-assign": ["error"],
    "no-return-await": ["error"],
    "no-script-url": ["error"],
    "no-self-compare": ["error"],
    "no-throw-literal": ["error"],
    "no-unmodified-loop-condition": ["error"],
    "no-useless-call": ["warn"],
    "no-useless-concat": ["warn"],
    "no-useless-return": ["error"],
    "prefer-promise-reject-errors": ["error"],
    "prefer-regex-literals": ["error"],
    "radix": ["error"],
    "require-await": ["warn"],
    "vars-on-top": ["error"],
    "yoda": ["error", "never"],

    // Strict
    "strict": ["error", "never"],

    // Variables
    "no-label-var": ["error"],

    // Style
    "no-array-constructor": ["error"],
    "no-bitwise": ["error"],
    "no-continue": ["error"],
    "no-lonely-if": ["error"],
    "no-multi-assign": ["error"],
    "no-new-object": ["error"],
    "no-unneeded-ternary": ["error"],
    "one-var": ["error", "never"],
    "operator-assignment": ["error", "always"],
    "prefer-object-spread": ["error"],

    // ES6
    "arrow-body-style": ["error", "as-needed"],
    "no-useless-computed-key": ["error"],
    "no-useless-constructor": ["error"],
    "no-useless-rename": ["error"],
    "no-var": ["error"],
    "object-shorthand": ["error", "always"],
    "prefer-arrow-callback": ["error"],
    "prefer-const": ["error"],
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }],
    "prefer-rest-params": ["error"],
    "prefer-spread": ["error"],
    "prefer-template": ["error"],
    "symbol-description": ["error"],

    // React hooks
    "react-hooks/exhaustive-deps": ["error"],
    "react-hooks/rules-of-hooks": ["error"],
  },
  settings: {
    "import/resolver": {
      "typescript": {},
    },
    "react": {
      "version": "detect",
    }
  }
}
