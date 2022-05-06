import FileReadingFailedError from "./FileReadingFailedError";


const FileReadingFailedErrorLocalization__English: FileReadingFailedError.Localization = {
  defaultTitle: "File reading failure",
  generateDescription: (
    namedParameters: FileReadingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The error occurred during the reading of the file with path: \n'${namedParameters.filePath}'`
};


export default FileReadingFailedErrorLocalization__English;
