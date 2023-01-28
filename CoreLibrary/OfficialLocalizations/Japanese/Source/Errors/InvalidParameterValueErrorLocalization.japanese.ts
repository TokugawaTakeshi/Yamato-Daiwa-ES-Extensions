import type { InvalidParameterValueError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidParameterValueErrorLocalization__Japanese: InvalidParameterValueError.Localization = {
  defaultTitle: "引数の値の不正",
  generateDescription:
      (namedParameters: InvalidParameterValueError.Localization.DescriptionTemplateNamedParameters): string =>
          `${ namedParameters.parameterNumber }番の引数（「${ namedParameters.parameterName }」）が不正な値になっている。` +
          `${ insertSubstring(namedParameters.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
          }) }`
};


export default InvalidParameterValueErrorLocalization__Japanese;
