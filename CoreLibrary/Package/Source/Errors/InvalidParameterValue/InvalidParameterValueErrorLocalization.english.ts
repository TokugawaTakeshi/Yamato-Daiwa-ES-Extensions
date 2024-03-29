import type InvalidParameterValueError from "./InvalidParameterValueError";
import insertSubstring from "../../Strings/insertSubstring";


const InvalidParameterValueErrorLocalization__English: InvalidParameterValueError.Localization = {
  defaultTitle: "Invalid parameter value",
  generateDescription:
    (parametersObject: InvalidParameterValueError.Localization.DescriptionTemplateNamedParameters): string =>
        `The value of parameter No. ${ parametersObject.parameterNumber } (commonly named as ` +
        `'${ parametersObject.parameterName }')' is invalid.` +
        `${ insertSubstring(parametersObject.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
        }) }`
};


export default InvalidParameterValueErrorLocalization__English;
