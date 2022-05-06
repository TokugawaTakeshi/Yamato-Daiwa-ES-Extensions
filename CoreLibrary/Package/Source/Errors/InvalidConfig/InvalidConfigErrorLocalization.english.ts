import InvalidConfigError from "./InvalidConfigError";
import insertSubstring from "../../Strings/insertSubstring";


const InvalidConfigErrorLocalization__English: InvalidConfigError.Localization = {
  defaultTitle: "Invalid config",
  generateDescription: (
    namedParameters: InvalidConfigError.Localization.DescriptionTemplateNamedParameters
  ): string => `The config of '${namedParameters.mentionToConfig}' is invalid.` +
      `${insertSubstring(namedParameters.messageSpecificPart, {
        modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
      })}`
};


export default InvalidConfigErrorLocalization__English;
