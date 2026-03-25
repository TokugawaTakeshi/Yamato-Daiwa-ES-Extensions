const YamatoDaiwaStyleGuides = require("@yamato-daiwa/style_guides/ECMAScript");


module.exports = [

  {
    ignores: [
      "02-LocalDevelopmentBuild",
      "03-ProductionBuild"
    ]
  },

  ...YamatoDaiwaStyleGuides,

  {
    files: [ "**/*.example.ts" ],
    rules: {
      "no-console": "off"
    }
  },

  {
    files: [ "Automation/TemplatesGenerator.ts" ],
    rules: [
      {
        "n/no-unpublished-import": [
          "error",
          {
            allowModules: [
              "@yamato-daiwa/documentation-files-templates",
              "@yamato-daiwa/es-extensions-nodejs"
            ]
          }
        ]
      }
    ]
  }

];
