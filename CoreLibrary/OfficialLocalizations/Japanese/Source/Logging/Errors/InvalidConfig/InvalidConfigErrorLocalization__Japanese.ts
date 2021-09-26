import { InvalidConfigError } from "@yamato-daiwa/es-extensions";


const InvalidConfigErrorLocalization__Japanese: InvalidConfigError.Localization = {
  defaultTitle: "不正設定",
  genericDescriptionPartTemplate: (
    parametersObject: InvalidConfigError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `設定：${parametersObject.mentionToConfig}は不備が有る。`
};


export default InvalidConfigErrorLocalization__Japanese;
