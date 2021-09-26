import { FileWritingFailedError } from "@yamato-daiwa/es-extensions";


const FileWritingFailedErrorLocalization__Russian: FileWritingFailedError.Localization = {
  defaultTitle: "Ошибка при записи файла",
  genericDescriptionPartTemplate: (
    parametersObject: FileWritingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `Произошла ошибки при записи файла пути: ${parametersObject.filePath}`
};


export default FileWritingFailedErrorLocalization__Russian;
