import type { InvalidParameterValueError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidParameterValueErrorLocalization__Russian: InvalidParameterValueError.Localization = {
  defaultTitle: "Невалидное значение параметра",
  generateDescription:
      (namedParameters: InvalidParameterValueError.Localization.DescriptionTemplateNamedParameters): string =>
          `Значение параметра '${ namedParameters.parameterName }' невалидно.` +
          `${ insertSubstring(namedParameters.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
          }) }`
};


export default InvalidParameterValueErrorLocalization__Russian;
