import type { InvalidConfigError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const invalidConfigErrorLocalization__japanese: InvalidConfigError.Localization = {
  defaultTitle: "不正な設定",
  generateDescription: (
    { mentionToConfig, messageSpecificPart }: InvalidConfigError.Localization.DescriptionTemplateVariables
  ): string =>
      `「${ mentionToConfig }」の設定が不正。` +
      insertSubstring(
        messageSpecificPart,
        { modifier: (specifiedMessageSpecificPart: string): string => `\n${ specifiedMessageSpecificPart }` }
      )
};
