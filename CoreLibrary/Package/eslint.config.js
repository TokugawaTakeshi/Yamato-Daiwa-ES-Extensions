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
    files: [ "Tests/Manual/**/*.ts", "Documentation/**/*.ts" ],
    rules: {

      /* Need some feedback for non-production examples. */
      "no-console": "off"

    }
  }
];
