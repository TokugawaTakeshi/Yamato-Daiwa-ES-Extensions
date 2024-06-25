import incompatiblePropertiesInObjectTypeParameterErrorLocalization__english from
    "./IncompatiblePropertiesInObjectTypeParameterErrorLocalization.english";


class IncompatiblePropertiesInObjectTypeParameterError extends Error {

  public static readonly NAME: string = "IncompatiblePropertiesError";

  public static localization: IncompatiblePropertiesInObjectTypeParameterError.Localization =
      incompatiblePropertiesInObjectTypeParameterErrorLocalization__english;


  public constructor(compoundParameter: IncompatiblePropertiesInObjectTypeParameterError.ConstructorParameter) {

    super();

    this.name = IncompatiblePropertiesInObjectTypeParameterError.NAME;

    if ("customMessage" in compoundParameter) {
      this.message = compoundParameter.customMessage;
    } else {
      this.message = IncompatiblePropertiesInObjectTypeParameterError.localization.generateDescription(compoundParameter);
    }

  }

}


namespace IncompatiblePropertiesInObjectTypeParameterError {

  export type ConstructorParameter = Localization.DescriptionTemplateVariables | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{
      parameterName: string;
      conflictingPropertyName: string;
      incompatiblePropertiesNames: Array<string>;
    }>;
  }

}


export default IncompatiblePropertiesInObjectTypeParameterError;
