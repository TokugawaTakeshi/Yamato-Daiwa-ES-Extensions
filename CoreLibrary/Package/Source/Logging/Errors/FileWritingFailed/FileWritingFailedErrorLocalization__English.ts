import FileWritingFailedError from "./FileWritingFailedError";


const FileWritingFailedErrorLocalization__English: FileWritingFailedError.Localization = {
  defaultTitle: "ファイル書き込み失敗",
  genericDescriptionPartTemplate: (
    parametersObject: FileWritingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `ファイル「${parametersObject.filePath}」の書き込み中エラーが発生しました。`
};


export default FileWritingFailedErrorLocalization__English;
