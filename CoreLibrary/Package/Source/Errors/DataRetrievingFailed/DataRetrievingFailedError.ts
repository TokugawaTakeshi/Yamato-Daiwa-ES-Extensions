import dataRetrievingFailedErrorLocalization__english from "./DataRetrievingFailedErrorLocalization.english";
import isNotUndefined from "../../TypeGuards/Nullables/isNotUndefined";
import stringifyAndFormatArbitraryValue from "../../Strings/stringifyAndFormatArbitraryValue";


class DataRetrievingFailedError extends Error {

  public static readonly NAME: string = "DataRetrievingFailedError";

  public static localization: DataRetrievingFailedError.Localization = dataRetrievingFailedErrorLocalization__english;

  public readonly additionalData?: unknown;


  public constructor(compoundParameter: DataRetrievingFailedError.ConstructorParameter) {

    super();

    this.name = DataRetrievingFailedError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        DataRetrievingFailedError.localization.generateDescription(compoundParameter);

    this.additionalData = compoundParameter.additionalData;

  }


  public toString(): string {
    return [
      super.toString(),
      ...isNotUndefined(this.additionalData) ? [ stringifyAndFormatArbitraryValue(this.additionalData) ] : []
    ].join("\n");
  }

}


namespace DataRetrievingFailedError {

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


export default DataRetrievingFailedError;
