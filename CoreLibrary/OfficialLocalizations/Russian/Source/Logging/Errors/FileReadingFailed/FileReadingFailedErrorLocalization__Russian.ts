import { FileReadingFailedError } from "@yamato-daiwa/es-extensions";


const DataRetrievingFailedErrorLocalization__Russian: FileReadingFailedError.Localization = {
  defaultTitle: "Ошибка при чтении файла",
  genericDescriptionPartTemplate: (
    parametersObject: FileReadingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `Произошла ошибка при чтении файла пути: ${parametersObject.filePath}`
};


export default DataRetrievingFailedErrorLocalization__Russian;
