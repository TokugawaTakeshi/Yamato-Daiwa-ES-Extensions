import ConfigFileNotFoundErrorLocalization__English from "./ConfigFileNotFoundErrorLocalization__English";


class ConfigFileNotFoundError extends Error {

  public static readonly NAME: string = "ConfigFileNotFoundError";
  public static get DEFAULT_TITLE(): string {
    return ConfigFileNotFoundError.localization.defaultTitle;
  }

  private static localization: ConfigFileNotFoundError.Localization = ConfigFileNotFoundErrorLocalization__English;


  public static setLocalization(localization: ConfigFileNotFoundError.Localization): void {
    ConfigFileNotFoundError.localization = localization;
  }


  public constructor(parametersObject: ConfigFileNotFoundError.ConstructorParametersObject) {

    super();

    this.name = ConfigFileNotFoundError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = ConfigFileNotFoundError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace ConfigFileNotFoundError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      targetTechnologyName: string;
      configFilePathOrMultipleOfThem: string | Array<string>;
    };
  }
}


export default ConfigFileNotFoundError;
