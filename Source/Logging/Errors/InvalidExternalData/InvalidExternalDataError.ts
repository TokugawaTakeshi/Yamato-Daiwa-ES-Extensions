import InvalidExternalDataErrorLocalization__English
  from "./InvalidExternalDataErrorLocalization__English";


class InvalidExternalDataError extends Error {

  public static readonly NAME: string = "InvalidExternalDataError";
  public static get DEFAULT_TITLE(): string {
    return InvalidExternalDataError.localization.defaultTitle;
  }

  private static localization: InvalidExternalDataError.Localization = InvalidExternalDataErrorLocalization__English;


  public static setLocalization(localization: InvalidExternalDataError.Localization): void {
    InvalidExternalDataError.localization = localization;
  }


  public constructor(parametersObject: InvalidExternalDataError.ConstructorParametersObject) {

    super();

    this.name = InvalidExternalDataError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = InvalidExternalDataError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace InvalidExternalDataError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      mentionToExpectedData: string;
      messageSpecificPart?: string;
    };
  }
}


export default InvalidExternalDataError;
