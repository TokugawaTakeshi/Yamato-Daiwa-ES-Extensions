import type { FileWritingFailedError } from "@yamato-daiwa/es-extensions";


const FileWritingFailedErrorLocalization__Japanese: FileWritingFailedError.Localization = {
  defaultTitle: "ファイル書き込み失敗",
  generateDescription: (
    namedParameters: FileWritingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `ファイル「${ namedParameters.filePath }」の書き込み中エラーが発生。`
};


export default FileWritingFailedErrorLocalization__Japanese;
