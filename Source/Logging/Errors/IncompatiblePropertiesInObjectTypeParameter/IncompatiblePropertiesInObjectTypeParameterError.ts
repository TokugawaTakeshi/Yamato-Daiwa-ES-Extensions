import IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English
  from "./IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English";


class IncompatiblePropertiesInObjectTypeParameterError extends Error {

  public static readonly NAME: string = "IncompatiblePropertiesError";
  public static get DEFAULT_TITLE(): string {
    return IncompatiblePropertiesInObjectTypeParameterError.localization.defaultTitle;
  }

  private static localization: IncompatiblePropertiesInObjectTypeParameterError.Localization =
      IncompatiblePropertiesInObjectTypeParameterErrorLocalization__English;


  public static setLocalization(localization: IncompatiblePropertiesInObjectTypeParameterError.Localization): void {
    IncompatiblePropertiesInObjectTypeParameterError.localization = localization;
  }


  public constructor(parametersObject: IncompatiblePropertiesInObjectTypeParameterError.ConstructorParametersObject) {

    super();

    this.name = IncompatiblePropertiesInObjectTypeParameterError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = IncompatiblePropertiesInObjectTypeParameterError.localization.genericDescriptionPartTemplate(
        parametersObject
      );
    }
  }
}


namespace IncompatiblePropertiesInObjectTypeParameterError {

  export type ConstructorParametersObject = { customMessage: string; } | Localization.GenericDescriptionPartTemplateParameters;

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      parameterName: string;
      conflictingPropertyName: string;
      incompatiblePropertiesNames: Array<string>;
    };
  }
}


export default IncompatiblePropertiesInObjectTypeParameterError;
