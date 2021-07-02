import DataSubmittingFailedErrorLocalization__English from "./DataSubmittingFailedErrorLocalization__English";


class DataSubmittingFailedError extends Error {

  public static readonly NAME: string = "DataSubmittingFailedError";
  public static get DEFAULT_TITLE(): string {
    return DataSubmittingFailedError.localization.defaultTitle;
  }

  private static localization: DataSubmittingFailedError.Localization = DataSubmittingFailedErrorLocalization__English;


  public static setLocalization(localization: DataSubmittingFailedError.Localization): void {
    DataSubmittingFailedError.localization = localization;
  }


  public constructor(parametersObject: DataSubmittingFailedError.ConstructorParametersObject) {

    super();

    this.name = DataSubmittingFailedError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = DataSubmittingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace DataSubmittingFailedError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      mentionToData: string;
    };
  }
}


export default DataSubmittingFailedError;
