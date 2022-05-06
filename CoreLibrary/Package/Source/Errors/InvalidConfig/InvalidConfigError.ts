import InvalidConfigErrorLocalization__English from "./InvalidConfigErrorLocalization.english";


class InvalidConfigError extends Error {

  public static readonly NAME: string = "InvalidConfigError";
  public static localization: InvalidConfigError.Localization = InvalidConfigErrorLocalization__English;


  public constructor(namedParameters: InvalidConfigError.ConstructorNamedParameters) {

    super();

    this.name = InvalidConfigError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = InvalidConfigError.localization.generateDescription(namedParameters);
    }
  }
}


namespace InvalidConfigError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  };

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = {
      readonly mentionToConfig: string;
      readonly messageSpecificPart?: string;
    };
  }
}


export default InvalidConfigError;
