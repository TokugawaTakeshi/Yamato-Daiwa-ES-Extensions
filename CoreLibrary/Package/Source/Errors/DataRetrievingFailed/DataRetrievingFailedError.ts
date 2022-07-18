import DataRetrievingFailedErrorLocalization__English from "./DataRetrievingFailedErrorLocalization.english";


class DataRetrievingFailedError extends Error {

  public static readonly NAME: string = "DataRetrievingFailedError";
  public static localization: DataRetrievingFailedError.Localization = DataRetrievingFailedErrorLocalization__English;

  public readonly typicalCause?: DataRetrievingFailedError.TypicalCauses;
  public readonly additionalData?: unknown;


  public constructor(namedParameters: DataRetrievingFailedError.ConstructorNamedParameters) {

    super();

    this.name = DataRetrievingFailedError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = DataRetrievingFailedError.localization.generateDescription(namedParameters);
    }

    this.typicalCause = namedParameters.typicalCause;
    this.additionalData = namedParameters.additionalData;
  }
}


namespace DataRetrievingFailedError {

  export type ConstructorNamedParameters =
      (Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>) &
      Readonly<{
        additionalData?: unknown;
        typicalCause?: TypicalCauses;
      }>;

  export enum TypicalCauses {
    notFound = "NOT_FOUND",
    notEnoughPermissions = "NOT_ENOUGH_PERMISSIONS"
  }

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{ mentionToData: string; }>;
  }
}


export default DataRetrievingFailedError;
