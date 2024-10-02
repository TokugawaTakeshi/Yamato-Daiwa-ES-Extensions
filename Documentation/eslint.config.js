const YamatoDaiwaStyleGuides = require("@yamato-daiwa/style_guides/ECMAScript");


module.exports = [
  {
    ignores: [
      "02-LocalDevelopmentBuild",
      "03-ProductionBuild"
    ]
  },
  ...YamatoDaiwaStyleGuides
];
