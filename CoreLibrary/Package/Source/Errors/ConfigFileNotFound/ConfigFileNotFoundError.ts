import ConfigFileNotFoundErrorLocalization__English from "./ConfigFileNotFoundErrorLocalization.english";


class ConfigFileNotFoundError extends Error {

  public static readonly NAME: string = "ConfigFileNotFoundError";
  public static localization: ConfigFileNotFoundError.Localization = ConfigFileNotFoundErrorLocalization__English;


  public constructor(namedParameters: ConfigFileNotFoundError.ConstructorNamedParameters) {

    super();

    this.name = ConfigFileNotFoundError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = ConfigFileNotFoundError.localization.generateDescription(namedParameters);
    }
  }
}


namespace ConfigFileNotFoundError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{
      targetTechnologyName: string;
      configFilePathOrMultipleOfThem: string | Array<string>;
    }>;
  }
}


export default ConfigFileNotFoundError;
