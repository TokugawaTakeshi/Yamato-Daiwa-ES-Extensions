import DOM_ElementRetrievingFailedErrorLocalization__English from "./DOM_ElementRetrievingFailedErrorLocalization.english";


class DOM_ElementRetrievingFailedError extends Error {

  public static readonly NAME: string = "DOM_ElementRetrievingFailedError";
  public static localization: DOM_ElementRetrievingFailedError.Localization =
      DOM_ElementRetrievingFailedErrorLocalization__English;


  public constructor(namedParameters: DOM_ElementRetrievingFailedError.ConstructorNamedParameters) {

    super();

    this.name = DOM_ElementRetrievingFailedError.NAME;

    if ("customMessage" in namedParameters) {
      this.message = namedParameters.customMessage;
    } else {
      this.message = DOM_ElementRetrievingFailedError.localization.generateDescription(namedParameters);
    }
  }
}


namespace DOM_ElementRetrievingFailedError {

  export type ConstructorNamedParameters = Localization.DescriptionTemplateNamedParameters | Readonly<{ customMessage: string; }>;

  export type Localization = Readonly<{
    defaultTitle: string;
    generateDescription: (namedParameters: Localization.DescriptionTemplateNamedParameters) => string;
  }>;

  export namespace Localization {
    export type DescriptionTemplateNamedParameters = Readonly<{ selector: string; }>;
  }
}


export default DOM_ElementRetrievingFailedError;
