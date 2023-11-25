import type InvalidExternalDataError from "./InvalidExternalDataError";
import insertSubstring from "../../Strings/insertSubstring";


export const invalidExternalDataErrorLocalization__english: InvalidExternalDataError.Localization = {
  defaultTitle: "Invalid external data",
  generateDescription: (
    { mentionToExpectedData, messageSpecificPart }: InvalidExternalDataError.Localization.DescriptionTemplateVariables
  ): string => `The data "${ mentionToExpectedData }" does not match with expected.` +
      `${ 
        insertSubstring(
          messageSpecificPart, 
          { modifier: (definedMessageSpecificPart: string): string => `\n${ definedMessageSpecificPart }` }
        ) 
      }`
};


export default invalidExternalDataErrorLocalization__english;
