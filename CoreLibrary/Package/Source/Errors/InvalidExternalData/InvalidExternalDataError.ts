import InvalidExternalDataErrorLocalization__English from "./InvalidExternalDataErrorLocalization.english";


class InvalidExternalDataError extends Error {

  public static readonly NAME: string = "InvalidExternalDataError";
  public static localization: InvalidExternalDataError.Localization = InvalidExternalDataErrorLocalization__English;


  public constructor(namedParameters: InvalidExternalDataError.ConstructorNamedParameters) {

    super();

    this.name = InvalidExternalDataError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = InvalidExternalDataError.localization.generateDescription(namedParameters);
    }
  }
}


namespace InvalidExternalDataError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  };

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = {
      readonly mentionToExpectedData: string;
      readonly messageSpecificPart?: string;
    };
  }
}


export default InvalidExternalDataError;
