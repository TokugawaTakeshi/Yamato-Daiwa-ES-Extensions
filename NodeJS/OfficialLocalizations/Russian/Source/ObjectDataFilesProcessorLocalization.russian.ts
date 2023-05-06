import { ObjectDataFilesProcessor } from "@yamato-daiwa/es-extensions-nodejs";

import Localization = ObjectDataFilesProcessor.Localization;


const objectDataFilesProcessorLocalization__russian: Localization = {

  generateUnableToDecideDataParsingAlgorithmErrorMessage: (
    { filePath }: Localization.UnableToDecideDataParsingAlgorithmErrorMessage.TemplateParameters
  ): string =>
      `Невозможно определить алгоритм обработки данных потому что имя целевого файла "${ filePath }" ` +
        "не имеет расширения. " +
      "Если Вы не хотите добавлять расширение имени файла, укажите свойству \"dataSchema\" параметра одно из значений " +
        "перечисления \"ObjectDataFilesProcessor.SupportedSchemas\".",

  generateUnsupportedFileNameExtension: (
    { filePath, fileNameLastExtensionWithoutLeadingDot }: Localization.UnsupportedFileNameExtensionErrorMessage.TemplateParameters
  ): string =>
      `Имя целевого файла "${ filePath }" имеет неподдерживаемое расширение "${ fileNameLastExtensionWithoutLeadingDot }". ` +
      "Если это намеренно и данный файл содержит в себе поддерживаемые \"ObjectDataFilesProcessor\" данные, " +
        "укажите свойству \"dataSchema\" параметра одно из значений перечисления \"ObjectDataFilesProcessor.SupportedSchemas\"."

};


export default objectDataFilesProcessorLocalization__russian;
