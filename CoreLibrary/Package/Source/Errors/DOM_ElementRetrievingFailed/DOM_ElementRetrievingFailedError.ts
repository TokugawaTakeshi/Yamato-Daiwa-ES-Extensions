import DOM_ElementRetrievingFailedErrorLocalization__english from "./DOM_ElementRetrievingFailedErrorLocalization.english";


class DOM_ElementRetrievingFailedError extends Error {

  public static readonly NAME: string = "DOM_ElementRetrievingFailedError";

  public static localization: DOM_ElementRetrievingFailedError.Localization =
      DOM_ElementRetrievingFailedErrorLocalization__english;


  public constructor(compoundParameter: DOM_ElementRetrievingFailedError.ConstructorParameter) {

    super();

    this.name = DOM_ElementRetrievingFailedError.NAME;

    this.message = "customMessage" in compoundParameter ?
        compoundParameter.customMessage :
        DOM_ElementRetrievingFailedError.localization.generateDescription(compoundParameter);

  }

}


namespace DOM_ElementRetrievingFailedError {

  export type ConstructorParameter = Localization.DescriptionTemplateVariables | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (templateVariables: Localization.DescriptionTemplateVariables) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateVariables = Readonly<{ selector: string; }>;
  }

}


export default DOM_ElementRetrievingFailedError;
