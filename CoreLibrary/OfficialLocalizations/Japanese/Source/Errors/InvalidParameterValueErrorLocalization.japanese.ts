import type { InvalidParameterValueError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const invalidParameterValueErrorLocalization__japanese: InvalidParameterValueError.Localization = {
  defaultTitle: "引数の値の不正",
  generateDescription:
      (
        {
          parameterNumber,
          parameterName,
          messageSpecificPart
        }: InvalidParameterValueError.Localization.DescriptionTemplateVariables
      ): string =>
          `${ parameterNumber }番の引数（「${ parameterName }」）が不正な値になっている。` +
          insertSubstring(
            messageSpecificPart,
            { modifier: (specifiedMessageSpecificPart: string): string => `\n${ specifiedMessageSpecificPart }` }
          )
};
