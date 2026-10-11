import type { InvalidExternalDataError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const invalidExternalDataErrorLocalization__russian: InvalidExternalDataError.Localization = {
  defaultTitle: "Внешние данные не соответствуют ожидаемым",
  generateDescription:
      (
        {
          messageSpecificPart,
          mentionToExpectedData
        }: InvalidExternalDataError.Localization.DescriptionTemplateVariables
      ): string =>
          `Внешние данные "${ mentionToExpectedData }" не соответствуют ожидаемым.` +
          insertSubstring(
            messageSpecificPart,
            { modifier: (specifiedMessageSpecificPart: string): string => `\n${ specifiedMessageSpecificPart }` }
          )
};
