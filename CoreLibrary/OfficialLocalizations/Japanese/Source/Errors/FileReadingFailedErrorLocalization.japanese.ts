import type { FileReadingFailedError } from "@yamato-daiwa/es-extensions";


const FileReadingFailedErrorLocalization__Japanese: FileReadingFailedError.Localization = {
  defaultTitle: "ファイル読み込み失敗",
  generateDescription: (namedParameters: FileReadingFailedError.Localization.DescriptionTemplateNamedParameters): string => 
      `ファイル「${ namedParameters.filePath }」の読み込み中に不具合発生。`
};


export default FileReadingFailedErrorLocalization__Japanese;
