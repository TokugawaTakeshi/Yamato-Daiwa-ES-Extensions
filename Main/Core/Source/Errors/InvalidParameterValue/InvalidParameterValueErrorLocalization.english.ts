import type InvalidParameterValueError from "./InvalidParameterValueError";
import insertSubstring from "../../Strings/insertSubstring";


const invalidParameterValueErrorLocalization__english: InvalidParameterValueError.Localization = {
  defaultTitle: "Invalid Parameter Value",
  generateDescription:
      (
        {
          parameterNumber,
          parameterName,
          messageSpecificPart
        }: InvalidParameterValueError.Localization.DescriptionTemplateVariables
      ): string =>
          `The value of parameter No. ${ parameterNumber } (commonly named as "${ parameterName }") is invalid.` +
          insertSubstring(
            messageSpecificPart,
            { modifier: (definedMessageSpecificPart: string): string => `\n${ definedMessageSpecificPart }` }
          )
};


export default invalidParameterValueErrorLocalization__english;
