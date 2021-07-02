import InvalidConfigErrorLocalization__Japanese from "./InvalidConfigErrorLocalization__English";


class InvalidConfigError extends Error {

  public static readonly NAME: string = "InvalidConfigError";
  public static get DEFAULT_TITLE(): string {
    return InvalidConfigError.localization.defaultTitle;
  }

  public static localization: InvalidConfigError.Localization = InvalidConfigErrorLocalization__Japanese;


  public static setLocalization(localization: InvalidConfigError.Localization): void {
    InvalidConfigError.localization = localization;
  }


  public constructor(parametersObject: InvalidConfigError.ConstructorParametersObject) {

    super();

    this.name = InvalidConfigError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = InvalidConfigError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace InvalidConfigError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = { mentionToConfig: string; };
  }
}


export default InvalidConfigError;
