import InvalidExternalDataError from "./InvalidExternalDataError";
import insertSubstring from "../../Strings/insertSubstring";


export const InvalidExternalDataErrorLocalization__English: InvalidExternalDataError.Localization = {
  defaultTitle: "Invalid external data",
  generateDescription: (
    namedParameters: InvalidExternalDataError.Localization.DescriptionTemplateNamedParameters
  ): string => `The data '${namedParameters.mentionToExpectedData}' does not match with expected.` +
      `${insertSubstring(namedParameters.messageSpecificPart, {
        modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
      })}`
};


export default InvalidExternalDataErrorLocalization__English;
