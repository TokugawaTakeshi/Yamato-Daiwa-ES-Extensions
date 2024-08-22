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
  }
];
