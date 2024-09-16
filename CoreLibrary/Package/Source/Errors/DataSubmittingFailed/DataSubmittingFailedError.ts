import dataSubmittingFailedErrorLocalization__english from "./DataSubmittingFailedErrorLocalization.english";
import isNotUndefined from "../../TypeGuards/Nullables/isNotUndefined";
import stringifyAndFormatArbitraryValue from "../../Strings/stringifyAndFormatArbitraryValue";


class DataSubmittingFailedError extends Error {

  public static readonly NAME: string = "DataSubmittingFailedError";

  public static localization: DataSubmittingFailedError.Localization = dataSubmittingFailedErrorLocalization__english;

  public readonly additionalData?: unknown;


  public constructor(compoundParameter: DataSubmittingFailedError.ConstructorParameter) {

    super();

    this.name = DataSubmittingFailedError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        DataSubmittingFailedError.localization.generateDescription(compoundParameter);

    this.additionalData = compoundParameter.additionalData;

  }


  public toString(): string {
    return [
      super.toString(),
      ...isNotUndefined(this.additionalData) ? [ stringifyAndFormatArbitraryValue(this.additionalData) ] : []
    ].join("\n");
  }

}


namespace DataSubmittingFailedError {

  export type ConstructorParameter =
      (Localization.DescriptionTemplateVariables | Readonly<{ customMessage: string; }>) &
      Readonly<{ additionalData?: unknown; }>;


  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{
      mentionToData: string;
      messageSpecificPart?: string;
    }>;
  }

}


export default DataSubmittingFailedError;
