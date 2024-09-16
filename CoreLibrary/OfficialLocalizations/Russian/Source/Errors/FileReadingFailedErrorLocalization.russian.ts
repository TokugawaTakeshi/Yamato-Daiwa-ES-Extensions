import type { FileReadingFailedError } from "@yamato-daiwa/es-extensions";


export const fileReadingFailedErrorLocalization__russian: FileReadingFailedError.Localization = {
  defaultTitle: "Ошибка при чтении файла",
  generateDescription: ({ filePath }: FileReadingFailedError.Localization.DescriptionTemplateVariables): string =>
      `Произошла ошибка при чтении файла пути "${ filePath }".`
};
