import type { InvalidParameterValueError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const invalidParameterValueErrorLocalization__russian: InvalidParameterValueError.Localization = {
  defaultTitle: "Невалидное значение параметра",
  generateDescription:
      (
        {
          parameterNumber,
          parameterName,
          messageSpecificPart
        }: InvalidParameterValueError.Localization.DescriptionTemplateVariables
      ): string =>
          `Значение параметра №${ parameterNumber } (общее название: "${ parameterName }") невалидно.` +
          insertSubstring(
            messageSpecificPart,
            { modifier: (specifiedMessageSpecificPart: string): string => `\n${ specifiedMessageSpecificPart }` }
          )
};
