import { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";


const DataSubmittingFailedErrorLocalization__Russian: DataSubmittingFailedError.Localization = {
  defaultTitle: "Ошибка при отправке данных",
  generateDescription: (
    namedParameters: DataSubmittingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `Произошла ошибка при отправке данных '${ namedParameters.mentionToData }'.`
};


export default DataSubmittingFailedErrorLocalization__Russian;
