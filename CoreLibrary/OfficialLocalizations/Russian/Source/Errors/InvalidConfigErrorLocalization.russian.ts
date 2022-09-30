import type { InvalidConfigError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidConfigErrorLocalization__Russian: InvalidConfigError.Localization = {
  defaultTitle: "Невалидные настройки",
  generateDescription: (
    namedParameters: InvalidConfigError.Localization.DescriptionTemplateNamedParameters
  ): string => `Настройки '${ namedParameters.mentionToConfig }' невалидны.` +
      `${ insertSubstring(namedParameters.messageSpecificPart, {
        modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
      }) }`
};


export default InvalidConfigErrorLocalization__Russian;
