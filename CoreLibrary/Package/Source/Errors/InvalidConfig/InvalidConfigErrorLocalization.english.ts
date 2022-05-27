import InvalidConfigError from "./InvalidConfigError";
import insertSubstring from "../../Strings/insertSubstring";


const InvalidConfigErrorLocalization__English: InvalidConfigError.Localization = {
  defaultTitle: "Invalid configuration",
  generateDescription: (
    namedParameters: InvalidConfigError.Localization.DescriptionTemplateNamedParameters
  ): string => `The configuration of '${namedParameters.mentionToConfig}' is invalid.` +
      `${insertSubstring(namedParameters.messageSpecificPart, {
        modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
      })}`
};


export default InvalidConfigErrorLocalization__English;
