import DataRetrievingFailedErrorLocalization__English from "./DataRetrievingFailedErrorLocalization__English";


class DataRetrievingFailedError extends Error {

  public static readonly NAME: string = "DataRetrievingFailedError";
  public static get DEFAULT_TITLE(): string {
    return DataRetrievingFailedError.localization.defaultTitle;
  }

  private static localization: DataRetrievingFailedError.Localization = DataRetrievingFailedErrorLocalization__English;


  public static setLocalization(localization: DataRetrievingFailedError.Localization): void {
    DataRetrievingFailedError.localization = localization;
  }


  public constructor(parametersObject: DataRetrievingFailedError.ConstructorParametersObject) {

    super();

    this.name = DataRetrievingFailedError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = DataRetrievingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace DataRetrievingFailedError {

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


export default DataRetrievingFailedError;
