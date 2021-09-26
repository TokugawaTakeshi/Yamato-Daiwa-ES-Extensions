import { FileReadingFailedError } from "@yamato-daiwa/es-extensions";


const DataRetrievingFailedErrorLocalization__Japanese: FileReadingFailedError.Localization = {
  defaultTitle: "ファイル読み込み失敗",
  genericDescriptionPartTemplate: (
    parametersObject: FileReadingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `ファイル「${parametersObject.filePath}」の読み込み中不具合が発生しました。`
};


export default DataRetrievingFailedErrorLocalization__Japanese;
