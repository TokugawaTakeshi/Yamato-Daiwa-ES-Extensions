import dataSubmittingFailedErrorLocalization__english from "./DataSubmittingFailedErrorLocalization.english";


class DataSubmittingFailedError extends Error {

  public static readonly NAME: string = "DataSubmittingFailedError";

  public static localization: DataSubmittingFailedError.Localization = dataSubmittingFailedErrorLocalization__english;

  public readonly typicalCause?: DataSubmittingFailedError.TypicalCauses;
  public readonly additionalData?: unknown;


  public constructor(compoundParameter: DataSubmittingFailedError.ConstructorParameter) {

    super();

    this.name = DataSubmittingFailedError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        DataSubmittingFailedError.localization.generateDescription(compoundParameter);

    this.typicalCause = compoundParameter.typicalCause;
    this.additionalData = compoundParameter.additionalData;

  }

}


namespace DataSubmittingFailedError {

  export type ConstructorParameter =
      (Localization.DescriptionTemplateVariables | Readonly<{ customMessage: string; }>) &
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
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{ mentionToData: string; }>;
  }

}


export default DataSubmittingFailedError;
