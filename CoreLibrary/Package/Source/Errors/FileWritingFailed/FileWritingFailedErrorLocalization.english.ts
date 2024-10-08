import type FileWritingFailedError from "./FileWritingFailedError";


const fileWritingFailedErrorLocalization__english: FileWritingFailedError.Localization = {
  defaultTitle: "Writing to file failure",
  generateDescription: (
    { filePath }: FileWritingFailedError.Localization.DescriptionTemplateVariables
  ): string => `Failed to write the file with path "${ filePath }".`
};


export default fileWritingFailedErrorLocalization__english;
