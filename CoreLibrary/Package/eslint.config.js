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
        project: "tsconfig.eslint.json"
      }
    }
  },

  {
    files: [ "**/*.ts" ],
    rules: {

      /* No Node.js limitations desired for core package because it can be used for browser only. */
      "n/no-unsupported-features/node-builtins": "off"

    }

  },

  {
    files: [ "Tests/Manual/**/*.ts", "Documentation/**/*.ts" ],
    rules: {

      /* Need some feedback for non-production examples. */
      "no-console": "off"

    }
  }

];
