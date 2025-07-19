const YamatoDaiwaStyleGuides = require("@yamato-daiwa/style_guides/ECMAScript");


module.exports = [
  {
    ignores: [
      "Distributable/*"
    ]
  },
  ...YamatoDaiwaStyleGuides,
  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.test.json"
      }
    }
  },
  {
    files: [ "Tests/Automated/**/*.test.ts" ],
    rules: {

      /* Higher version of Node.js is required for developers. */
      "n/no-unsupported-features/node-builtins": [
        "error",
        {
          version: ">=22.0.0"
        }
      ]

    }
  }
];
