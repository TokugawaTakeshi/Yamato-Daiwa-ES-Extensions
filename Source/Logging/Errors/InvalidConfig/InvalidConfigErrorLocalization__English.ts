import InvalidConfigError from "./InvalidConfigError";


const InvalidConfigErrorLocalization__English: InvalidConfigError.Localization = {
  defaultTitle: "Invalid config",
  genericDescriptionPartTemplate: (
    parametersObject: InvalidConfigError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `The ${parametersObject.mentionToConfig} config is invalid.`
};


export default InvalidConfigErrorLocalization__English;
