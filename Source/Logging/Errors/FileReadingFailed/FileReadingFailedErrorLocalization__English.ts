import FileReadingFailedError from "./FileReadingFailedError";


const FileReadingFailedErrorLocalization__English: FileReadingFailedError.Localization = {
  defaultTitle: "File reading failure",
  genericDescriptionPartTemplate: (
    parametersObject: FileReadingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `The error occurred during the reading of the file with path :${parametersObject.filePath}`
};


export default FileReadingFailedErrorLocalization__English;
