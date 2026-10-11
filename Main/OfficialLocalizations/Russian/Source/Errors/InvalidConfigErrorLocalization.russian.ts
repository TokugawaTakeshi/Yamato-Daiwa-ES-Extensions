import type { InvalidConfigError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const invalidConfigErrorLocalization__russian: InvalidConfigError.Localization = {
  defaultTitle: "Невалидные настройки",
  generateDescription: (
    {
      mentionToConfig,
      messageSpecificPart
    }: InvalidConfigError.Localization.DescriptionTemplateVariables
  ): string =>
      `Настройки "${ mentionToConfig }" невалидны.` +
      insertSubstring(
        messageSpecificPart,
        { modifier: (specifiedMessageSpecificPart: string): string => `\n${ specifiedMessageSpecificPart }` }
      )
};
