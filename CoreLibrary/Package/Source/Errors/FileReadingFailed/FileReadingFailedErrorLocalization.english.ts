import type FileReadingFailedError from "./FileReadingFailedError";


const fileReadingFailedErrorLocalization__english: FileReadingFailedError.Localization = {
  defaultTitle: "File reading failure",
  generateDescription: (
    { filePath }: FileReadingFailedError.Localization.DescriptionTemplateVariables
  ): string => `The error occurred during the reading of the file with path: \n"${ filePath }"`
};


export default fileReadingFailedErrorLocalization__english;
