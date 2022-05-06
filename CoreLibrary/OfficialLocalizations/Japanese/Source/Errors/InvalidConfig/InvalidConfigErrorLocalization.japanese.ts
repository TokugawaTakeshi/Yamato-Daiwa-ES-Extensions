import type { InvalidConfigError } from "@yamato-daiwa/es-extensions";


const InvalidConfigErrorLocalization__Japanese: InvalidConfigError.Localization = {
  defaultTitle: "不正設定",
  generateDescription: (
    namedParameters: InvalidConfigError.Localization.DescriptionTemplateNamedParameters
  ): string => `設定「${namedParameters.mentionToConfig}」は不備が有る。`
};


export default InvalidConfigErrorLocalization__Japanese;
