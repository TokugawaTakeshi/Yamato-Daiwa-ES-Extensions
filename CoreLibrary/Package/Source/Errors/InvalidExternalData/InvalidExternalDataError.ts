import invalidExternalDataErrorLocalization__english from "./InvalidExternalDataErrorLocalization.english";


class InvalidExternalDataError extends Error {

  public static readonly NAME: string = "InvalidExternalDataError";

  public static localization: InvalidExternalDataError.Localization = invalidExternalDataErrorLocalization__english;


  public constructor(compoundParameter: InvalidExternalDataError.ConstructorParameter) {

    super();

    this.name = InvalidExternalDataError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        InvalidExternalDataError.localization.generateDescription(compoundParameter);

  }

}


namespace InvalidExternalDataError {

  export type ConstructorParameter = Localization.DescriptionTemplateVariables | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{
      mentionToExpectedData: string;
      messageSpecificPart?: string;
    }>;
  }

}


export default InvalidExternalDataError;
