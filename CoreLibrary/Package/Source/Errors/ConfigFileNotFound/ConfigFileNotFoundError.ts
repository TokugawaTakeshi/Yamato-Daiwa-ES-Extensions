import configFileNotFoundErrorLocalization__english from "./ConfigFileNotFoundErrorLocalization.english";


class ConfigFileNotFoundError extends Error {

  public static readonly NAME: string = "ConfigFileNotFoundError";

  public static localization: ConfigFileNotFoundError.Localization = configFileNotFoundErrorLocalization__english;


  public constructor(compoundParameter: ConfigFileNotFoundError.ConstructorParameter) {

    super();

    this.name = ConfigFileNotFoundError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        ConfigFileNotFoundError.localization.generateDescription(compoundParameter);

  }

}


namespace ConfigFileNotFoundError {

  export type ConstructorParameter =
      Localization.DescriptionTemplateVariables |
      Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{
      targetTechnologyName: string;
      configFilePathOrMultipleOfThem: string | ReadonlyArray<string>;
      messageSpecificPart?: string;
    }>;

  }

}


export default ConfigFileNotFoundError;
