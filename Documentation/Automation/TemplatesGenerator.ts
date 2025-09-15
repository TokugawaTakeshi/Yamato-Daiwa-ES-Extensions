import { TemplatesGenerator } from "@yamato-daiwa/documentation-files-templates";


TemplatesGenerator.generate({
  main: [
    {
      templatePathRelativeToProjectDirectory: "Automation/Templates/Main/DocumentationPage.english.template.pug",
      outputFileNamePattern: "[BASIC_FILE_NAME].english.pug"
    },
    {
      templatePathRelativeToProjectDirectory: "Automation/Templates/Main/DocumentationPage.japanese.template.pug",
      outputFileNamePattern: "[BASIC_FILE_NAME].japanese.pug"
    },
    {
      templatePathRelativeToProjectDirectory: "Automation/Templates/Main/DocumentationPage.russian.template.pug",
      outputFileNamePattern: "[BASIC_FILE_NAME].russian.pug"
    },
    {
      templatePathRelativeToProjectDirectory: "Automation/Templates/Main/DocumentationPage.toc.template.yaml",
      outputFileNamePattern: "[BASIC_FILE_NAME].toc.yaml",
      subdirectory: "TableOfContents"
    },
    {
      templatePathRelativeToProjectDirectory: "Automation/Templates/Main/DocumentationPage.toc.english.template.yaml",
      outputFileNamePattern: "[BASIC_FILE_NAME].toc.english.yaml",
      subdirectory: "TableOfContents"
    },
    {
      templatePathRelativeToProjectDirectory: "Automation/Templates/Main/DocumentationPage.toc.japanese.template.yaml",
      outputFileNamePattern: "[BASIC_FILE_NAME].toc.japanese.yaml",
      subdirectory: "TableOfContents"
    },
    {
      templatePathRelativeToProjectDirectory: "Automation/Templates/Main/DocumentationPage.toc.russian.template.yaml",
      outputFileNamePattern: "[BASIC_FILE_NAME].toc.russian.yaml",
      subdirectory: "TableOfContents"
    }
  ]
});
