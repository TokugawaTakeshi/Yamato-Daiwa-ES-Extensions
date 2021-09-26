import { DataSubmittingFailedError } from "@yamato-daiwa/es-extensions";


const DataSubmittingFailedErrorLocalization__Russian: DataSubmittingFailedError.Localization = {
  defaultTitle: "Ошибка при отправке данных",
  genericDescriptionPartTemplate: (
    parametersObject: DataSubmittingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `Произошла ошибка при отправке данных ${parametersObject.mentionToData}.`
};


export default DataSubmittingFailedErrorLocalization__Russian;
