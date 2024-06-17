import type FileNotFoundError from "./FileNotFoundError";


const fileNotFoundErrorLocalization__english: FileNotFoundError.Localization = {
  defaultTitle: "File not found error",
  generateDescriptionCommonPart:
      ({ filePath }: FileNotFoundError.Localization.CommonDescription.TemplateVariables): string =>
          `File with path "${ filePath }" not found.`
};


export default fileNotFoundErrorLocalization__english;
