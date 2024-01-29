module.exports = {
  env: { browser: true },
  extends: ["plugin:react-hooks/recommended"],
  ignorePatterns: ["dist"],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
