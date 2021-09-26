import { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";


const DataRetrievingFailedErrorLocalization__Japanese: DataRetrievingFailedError.Localization = {
  defaultTitle: "Ошибка при получении данных",
  genericDescriptionPartTemplate: (
    parametersObject: DataRetrievingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `Произошла ошибка при получении данных ${parametersObject.mentionToData} из внешнего источника.`
};


export default DataRetrievingFailedErrorLocalization__Japanese;
