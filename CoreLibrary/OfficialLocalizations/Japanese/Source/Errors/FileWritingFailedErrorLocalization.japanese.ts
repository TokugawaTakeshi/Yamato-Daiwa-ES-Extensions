import type { FileWritingFailedError } from "@yamato-daiwa/es-extensions";


export const fileWritingFailedErrorLocalization__japanese: FileWritingFailedError.Localization = {
  defaultTitle: "ファイル書き込み失敗",
  generateDescription: (
    { filePath }: FileWritingFailedError.Localization.DescriptionTemplateVariables
  ): string =>
      `ファイル「${ filePath }」の書き込み中に不具合発生。`
};
