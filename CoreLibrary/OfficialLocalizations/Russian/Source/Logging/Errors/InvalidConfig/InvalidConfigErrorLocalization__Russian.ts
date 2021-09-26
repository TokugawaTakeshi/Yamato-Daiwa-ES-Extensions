import { InvalidConfigError } from "@yamato-daiwa/es-extensions";


const InvalidConfigErrorLocalization__Russian: InvalidConfigError.Localization = {
  defaultTitle: "Невалидные настройки",
  genericDescriptionPartTemplate: (
    parametersObject: InvalidConfigError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `Настройки ${parametersObject.mentionToConfig} невалидны.`
};


export default InvalidConfigErrorLocalization__Russian;
