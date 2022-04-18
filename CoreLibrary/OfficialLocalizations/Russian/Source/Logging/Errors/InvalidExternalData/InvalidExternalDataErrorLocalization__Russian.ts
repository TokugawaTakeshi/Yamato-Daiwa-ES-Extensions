import { InvalidExternalDataError, insertSubstring } from "@yamato-daiwa/es-extensions";


export const InvalidExternalDataErrorLocalization__Russian: InvalidExternalDataError.Localization = {
  defaultTitle: "Внешние данные не соответствуют ожидаемым",
  genericDescriptionPartTemplate:
      (
        parametersObject: InvalidExternalDataError.Localization.
            GenericDescriptionPartTemplateParameters
      ): string => `Внешние данные ${parametersObject.mentionToExpectedData} не соответствуют ожидаемым.` +
          `${insertSubstring(parametersObject.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
          })}`
};


export default InvalidExternalDataErrorLocalization__Russian;
