import type { FileWritingFailedError } from "@yamato-daiwa/es-extensions";


export const fileWritingFailedErrorLocalization__russian: FileWritingFailedError.Localization = {
  defaultTitle: "Ошибка при записи файла",
  generateDescription: (
    { filePath }: FileWritingFailedError.Localization.DescriptionTemplateVariables
  ): string =>
      `Произошла ошибки при записи файла по пути\n: '${ filePath }'`
};
