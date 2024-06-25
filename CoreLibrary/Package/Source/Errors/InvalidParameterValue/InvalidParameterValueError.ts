import invalidParameterValueErrorLocalization__english from "./InvalidParameterValueErrorLocalization.english";


class InvalidParameterValueError extends Error {

  public static readonly NAME: string = "InvalidParameterValueError";

  public static localization: InvalidParameterValueError.Localization = invalidParameterValueErrorLocalization__english;


  public constructor(compoundParameter: InvalidParameterValueError.ConstructorParameter) {

    super();

    this.name = InvalidParameterValueError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        InvalidParameterValueError.localization.generateDescription(compoundParameter);

  }

}


namespace InvalidParameterValueError {

  export type ConstructorParameter = Localization.DescriptionTemplateVariables | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{
      parameterNumber: number;
      parameterName: string;
      messageSpecificPart?: string;
    }>;
  }

}


export default InvalidParameterValueError;
