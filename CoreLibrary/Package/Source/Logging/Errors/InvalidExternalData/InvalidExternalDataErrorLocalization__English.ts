import InvalidExternalDataError from "./InvalidExternalDataError";
import insertSubstring from "../../../Strings/insertSubstring";


export const InvalidExternalDataErrorLocalization__English: InvalidExternalDataError.Localization = {
  defaultTitle: "Invalid external data",
  genericDescriptionPartTemplate: (
    parametersObject: InvalidExternalDataError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `The data: ${parametersObject.mentionToExpectedData} does not match with expected.` +
        `${insertSubstring(parametersObject.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
        })}`
};


export default InvalidExternalDataErrorLocalization__English;
