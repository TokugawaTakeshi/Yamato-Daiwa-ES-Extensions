import type { DataRetrievingFailedError } from "@yamato-daiwa/es-extensions";


const DataRetrievingFailedErrorLocalization__Russian: DataRetrievingFailedError.Localization = {
  defaultTitle: "Ошибка при получении данных",
  generateDescription: (
    namedParameters: DataRetrievingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `Произошла ошибка при получении данных '${namedParameters.mentionToData}' из внешнего источника.`
};


export default DataRetrievingFailedErrorLocalization__Russian;
