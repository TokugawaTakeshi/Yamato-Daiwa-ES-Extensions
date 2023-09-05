import invalidConfigErrorLocalization__english from "./InvalidConfigErrorLocalization.english";


class InvalidConfigError extends Error {

  public static readonly NAME: string = "InvalidConfigError";
  public static localization: InvalidConfigError.Localization = invalidConfigErrorLocalization__english;


  public constructor(compoundParameter: InvalidConfigError.ConstructorParameter) {

    super();

    this.name = InvalidConfigError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        InvalidConfigError.localization.generateDescription(compoundParameter);

  }

}


namespace InvalidConfigError {

  export type ConstructorParameter = Localization.DescriptionTemplateVariables | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{
      mentionToConfig: string;
      messageSpecificPart?: string;
    }>;
  }

}


export default InvalidConfigError;
