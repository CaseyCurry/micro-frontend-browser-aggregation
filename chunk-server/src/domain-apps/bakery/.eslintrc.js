module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: false
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  settings: {
    react: {
      version: "16.0"
    },
    propWrapperFunctions: ["forbidExtraProps"]
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: [
      "error",
      2,
      {
        SwitchCase: 1
      }
    ],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "off",
    "no-underscore-dangle": "error"
  }
};
