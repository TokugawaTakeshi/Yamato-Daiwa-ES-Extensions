import InvalidConfigError from "./InvalidConfigError";
import insertSubstring from "../../../Strings/insertSubstring";


const InvalidConfigErrorLocalization__English: InvalidConfigError.Localization = {
  defaultTitle: "Invalid config",
  genericDescriptionPartTemplate: (
    parametersObject: InvalidConfigError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `The ${parametersObject.mentionToConfig} config is invalid.` +
      `${insertSubstring(parametersObject.messageSpecificPart, {
        modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
      })}`
};


export default InvalidConfigErrorLocalization__English;
