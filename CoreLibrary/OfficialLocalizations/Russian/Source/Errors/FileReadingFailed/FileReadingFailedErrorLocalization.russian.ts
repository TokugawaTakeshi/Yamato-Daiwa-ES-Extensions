import type { FileReadingFailedError } from "@yamato-daiwa/es-extensions";


const FileReadingFailedErrorLocalization__Russian: FileReadingFailedError.Localization = {
  defaultTitle: "Ошибка при чтении файла",
  generateDescription: (namedParameters: FileReadingFailedError.Localization.DescriptionTemplateNamedParameters): string => 
      `Произошла ошибка при чтении файла '${ namedParameters.filePath }'.`
};


export default FileReadingFailedErrorLocalization__Russian;
