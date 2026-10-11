import type { FileReadingFailedError } from "@yamato-daiwa/es-extensions";


export const fileReadingFailedErrorLocalization__japanese: FileReadingFailedError.Localization = {
  defaultTitle: "ファイル読み込み失敗",
  generateDescription: ({ filePath }: FileReadingFailedError.Localization.DescriptionTemplateVariables): string =>
      `ファイル「${ filePath }」の読み込み中に不具合発生。`
};
