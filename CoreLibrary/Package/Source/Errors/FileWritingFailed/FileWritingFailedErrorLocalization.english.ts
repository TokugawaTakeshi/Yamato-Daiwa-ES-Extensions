import FileWritingFailedError from "./FileWritingFailedError";


const FileWritingFailedErrorLocalization__English: FileWritingFailedError.Localization = {
  defaultTitle: "Writing to file failure",
  generateDescription: (
    parametersObject: FileWritingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `Failed to write the file with path '${parametersObject.filePath}'.`
};


export default FileWritingFailedErrorLocalization__English;
