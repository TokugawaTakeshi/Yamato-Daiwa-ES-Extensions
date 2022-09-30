import type { FileWritingFailedError } from "@yamato-daiwa/es-extensions";


const FileWritingFailedErrorLocalization__Russian: FileWritingFailedError.Localization = {
  defaultTitle: "Ошибка при записи файла",
  generateDescription: (
    namedParameters: FileWritingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `Произошла ошибки при записи файла по пути\n: '${ namedParameters.filePath }'`
};


export default FileWritingFailedErrorLocalization__Russian;
