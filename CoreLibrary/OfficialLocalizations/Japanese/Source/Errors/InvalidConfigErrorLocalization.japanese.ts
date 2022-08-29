import type { InvalidConfigError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidConfigErrorLocalization__Japanese: InvalidConfigError.Localization = {
  defaultTitle: "不正な設定",
  generateDescription: (
    namedParameters: InvalidConfigError.Localization.DescriptionTemplateNamedParameters
  ): string => `「${ namedParameters.mentionToConfig }」の設定が不正。` +
      `${ insertSubstring(namedParameters.messageSpecificPart, {
        modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
      }) }`
};


export default InvalidConfigErrorLocalization__Japanese;
