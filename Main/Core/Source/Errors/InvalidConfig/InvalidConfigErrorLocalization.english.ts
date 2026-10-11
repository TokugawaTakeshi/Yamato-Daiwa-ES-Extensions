import type InvalidConfigError from "./InvalidConfigError";
import insertSubstring from "../../Strings/insertSubstring";


const invalidConfigErrorLocalization__english: InvalidConfigError.Localization = {
  defaultTitle: "Invalid Configuration",
  generateDescription: (
    { mentionToConfig, messageSpecificPart }: InvalidConfigError.Localization.DescriptionTemplateVariables
  ): string =>
      `The configuration of "${ mentionToConfig }" is invalid.` +
      insertSubstring(
        messageSpecificPart,
        { modifier: (definedMessageSpecificPart: string): string => `\n${ definedMessageSpecificPart }` }
      )
};


export default invalidConfigErrorLocalization__english;
