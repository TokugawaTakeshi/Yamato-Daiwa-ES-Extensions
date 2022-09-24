import type { InvalidParameterValueError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidParameterValueErrorLocalization__Japanese: InvalidParameterValueError.Localization = {
  defaultTitle: "引数不正値",
  generateDescription:
      (namedParameters: InvalidParameterValueError.Localization.DescriptionTemplateNamedParameters): string =>
          `引数「${ namedParameters.parameterName }」の値は不備が有る。` +
          `${ insertSubstring(namedParameters.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
          }) }`
};


export default InvalidParameterValueErrorLocalization__Japanese;
