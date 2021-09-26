import { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";


const DataRetrievingFailedErrorLocalization__Japanese: DataRetrievingFailedError.Localization = {
  defaultTitle: "データ源からデータ取得失敗",
  genericDescriptionPartTemplate: (
    parametersObject: DataRetrievingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `データ「${parametersObject.mentionToData}」を外部源からの取得中不具合が発生した。`

};


export default DataRetrievingFailedErrorLocalization__Japanese;
