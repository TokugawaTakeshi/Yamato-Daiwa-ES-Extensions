import { TemplatesGenerator } from "@yamato-daiwa/documentation-files-templates";
import { type ArbitraryObject, isNonEmptyString } from "@yamato-daiwa/es-extensions";
import { ImprovedPath } from "@yamato-daiwa/es-extensions-nodejs";


TemplatesGenerator.generate({
  main: {
    questions: [
      {
        text: "Please specify the route including \"$children\" properties.",
        example: "coreLibrary.$children.functionality.$children.AJAX.$children.AJAX_Service",
        isAnswerValid: isNonEmptyString,
        onValidAnswerAccepted(
          targetRouteWithChildrenPointers: string, templateVariables: ArbitraryObject
        ): void {
          templateVariables.$targetRouteWithoutChildrenPointers =
              targetRouteWithChildrenPointers.replaceAll("$children.", "");
        },
        templateVariableName: "$targetRouteWithChildrenPointers"
      },
      {
        text: "Please input the output directory path relative to \"Pages\" directory.",
        example: "CoreLibrary/Functionality/AJAX/AJAX_Service",
        isAnswerValid: isNonEmptyString,
        onValidAnswerAccepted(
          outputDirectoryPathRelativeToPagesDirectory: string, templateVariables: ArbitraryObject
        ): void {

          const sourceDirectoryAbsolutePath: string = ImprovedPath.joinPathSegments(
            [ process.cwd(), "01-Source" ],
            { alwaysForwardSlashSeparators: true }
          );

          templateVariables.sourceDirectoryAbsolutePath = sourceDirectoryAbsolutePath;


          const outputDirectoryAbsolutePath: string = ImprovedPath.joinPathSegments(
            [ sourceDirectoryAbsolutePath, "Pages", outputDirectoryPathRelativeToPagesDirectory ],
            { alwaysForwardSlashSeparators: true }
          );

          templateVariables.outputDirectoryAbsolutePath = outputDirectoryAbsolutePath;


          templateVariables.$$PATH_RELATIVE_TO_PROJECT_ROOT_DIRECTORY = ImprovedPath.computeRelativePath({
            basePath: outputDirectoryAbsolutePath,
            comparedPath: process.cwd(),
            alwaysForwardSlashSeparators: true
          });

          templateVariables.$$PATH_RELATIVE_TO_SOURCE_DIRECTORY = ImprovedPath.computeRelativePath({
            basePath: outputDirectoryAbsolutePath,
            comparedPath: sourceDirectoryAbsolutePath,
            alwaysForwardSlashSeparators: true
          });

        },
        templateVariableName: "outputDirectoryPathRelativeToPagesDirectory"
      },
      {
        text: "Please input the basic file name without extension.",
        example: "AJAX_Service",
        isAnswerValid: isNonEmptyString,
        templateVariableName: "basicFileNameWithoutExtensions"
      }
    ],
    files: [
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
  }
});
