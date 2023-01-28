import {
  AlgorithmMismatchError,
  Logger,
  PoliteErrorsMessagesBuilder
} from "../../../Source";


Logger.throwErrorAndLog({
  errorType: "Markup linting error",
  title: AlgorithmMismatchError.localization.defaultTitle,
  description: PoliteErrorsMessagesBuilder.buildMessage({
    technicalDetails: "The error occurred during execution of 'pugLintInstance.checkFile(filePath)'",
    politeExplanation: "The Pug linter has thrown the error under unknown for YDA developers combination " +
        " of conditions.",
    bugTrackerURI: "https://github.com/TokugawaTakeshi/Yamato-Daiwa-Automation/issues"
  }),
  occurrenceLocation: "markupSourceCodeLinter.lint()"
});
