import InvalidParameterValueErrorLocalization__English from "./InvalidParameterValueErrorLocalization.english";


class InvalidParameterValueError extends Error {

  public static readonly NAME: string = "InvalidParameterValueError";
  public static localization: InvalidParameterValueError.Localization = InvalidParameterValueErrorLocalization__English;


  public constructor(namedParameters: InvalidParameterValueError.ConstructorNamedParameters) {

    super();

    this.name = InvalidParameterValueError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = InvalidParameterValueError.localization.generateDescription(namedParameters);
    }
  }
}


namespace InvalidParameterValueError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  };

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = {
      readonly parameterName: string;
      readonly messageSpecificPart?: string;
    };
  }
}


export default InvalidParameterValueError;
