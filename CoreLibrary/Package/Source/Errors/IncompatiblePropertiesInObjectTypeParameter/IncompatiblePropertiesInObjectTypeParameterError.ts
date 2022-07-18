import IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English from
    "./IncompatiblePropertiesInObjectTypeParameterErrorLocalization.english";


class IncompatiblePropertiesInObjectTypeParameterError extends Error {

  public static readonly NAME: string = "IncompatiblePropertiesError";
  public static localization: IncompatiblePropertiesInObjectTypeParameterError.Localization =
      IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English;


  public constructor(namedParameters: IncompatiblePropertiesInObjectTypeParameterError.ConstructorNamedParameters) {

    super();

    this.name = IncompatiblePropertiesInObjectTypeParameterError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = IncompatiblePropertiesInObjectTypeParameterError.localization.generateDescription(namedParameters);
    }
  }
}


namespace IncompatiblePropertiesInObjectTypeParameterError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{
      parameterName: string;
      conflictingPropertyName: string;
      incompatiblePropertiesNames: Array<string>;
    }>;
  }
}


export default IncompatiblePropertiesInObjectTypeParameterError;
