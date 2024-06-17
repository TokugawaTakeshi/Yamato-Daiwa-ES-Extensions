import { ObjectDataFilesProcessor } from "@yamato-daiwa/es-extensions-nodejs";

import Localization = ObjectDataFilesProcessor.Localization;


const objectDataFilesProcessorLocalization__japanese: Localization = {

  generateUnableToDecideDataParsingAlgorithmErrorMessage: (
    { filePath }: Localization.UnableToDecideDataParsingAlgorithmErrorMessage.TemplateVariables
  ): string =>
      `パス「${ filePath }」のファイルの名前はファイル名拡張子が無い為、データ処理方法を決める事は不可能。` +
      "当ファイル名にフ拡張子を追加したくない場合、引数の「dataSchema」プロパティに列挙「ObjectDataFilesProcessor.SupportedSchemas」の望ましい要素" +
        "を指定して下さい。",

  generateUnsupportedFileNameExtension: (
    { filePath, fileNameLastExtensionWithoutLeadingDot }: Localization.UnsupportedFileNameExtensionErrorMessage.TemplateVariables
  ): string =>
      `目標的ファイル「${ filePath }」のパスは非対応のファイル名拡張子「${ fileNameLastExtensionWithoutLeadingDot }」を持っている。` +
      "それは意識的で、当ファイルは「ObjectDataFilesProcessor」に知られている形式のデータを含めている場合、引数の「dataSchema」プロパティに列挙" +
        "「ObjectDataFilesProcessor.SupportedSchemas」の望ましい要素を指定して下さい。"

};


export default objectDataFilesProcessorLocalization__japanese;
