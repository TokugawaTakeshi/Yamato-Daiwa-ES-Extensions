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

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{
      parameterNumber: number;
      parameterName: string;
      messageSpecificPart?: string;
    }>;
  }
}


export default InvalidParameterValueError;
