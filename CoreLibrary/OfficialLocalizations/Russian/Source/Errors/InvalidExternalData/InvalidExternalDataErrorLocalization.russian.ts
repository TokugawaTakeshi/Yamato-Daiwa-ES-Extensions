import type { InvalidExternalDataError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const InvalidExternalDataErrorLocalization__Russian: InvalidExternalDataError.Localization = {
  defaultTitle: "Внешние данные не соответствуют ожидаемым",
  generateDescription:
      (namedParameters: InvalidExternalDataError.Localization.DescriptionTemplateNamedParameters): string =>
          `Внешние данные '${namedParameters.mentionToExpectedData}' не соответствуют ожидаемым.` +
          `${ insertSubstring(namedParameters.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
          }) }`
};


export default InvalidExternalDataErrorLocalization__Russian;
