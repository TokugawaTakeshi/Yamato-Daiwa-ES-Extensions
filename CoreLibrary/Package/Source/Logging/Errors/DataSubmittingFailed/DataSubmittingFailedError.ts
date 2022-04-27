import DataSubmittingFailedErrorLocalization__English from "./DataSubmittingFailedErrorLocalization.english";


class DataSubmittingFailedError extends Error {

  public static readonly NAME: string = "DataSubmittingFailedError";
  public static localization: DataSubmittingFailedError.Localization = DataSubmittingFailedErrorLocalization__English;

  public readonly typicalCause?: DataSubmittingFailedError.TypicalCauses;
  public readonly additionalData?: unknown;


  public constructor(namedParameters: DataSubmittingFailedError.ConstructorNamedParameters) {

    super();

    this.name = DataSubmittingFailedError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = DataSubmittingFailedError.localization.generateDescription(namedParameters);
    }

    this.typicalCause = namedParameters.typicalCause;
    this.additionalData = namedParameters.additionalData;
  }
}


namespace DataSubmittingFailedError {

  export type ConstructorNamedParameters =
      (Localization.DescriptionTemplateNamedParameters | { customMessage: string; }) &
      {
        readonly additionalData?: unknown;
        readonly typicalCause?: TypicalCauses;
      };

  export enum TypicalCauses {
    notFound = "NOT_FOUND",
    notEnoughPermissions = "NOT_ENOUGH_PERMISSIONS"
  }

  export type Localization = {
    readonly defaultTitle: string;
    readonly generateDescription: (parametersObject: Localization.DescriptionTemplateNamedParameters) => string;
  };

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = {
      readonly mentionToData: string;
    };
  }
}


export default DataSubmittingFailedError;
