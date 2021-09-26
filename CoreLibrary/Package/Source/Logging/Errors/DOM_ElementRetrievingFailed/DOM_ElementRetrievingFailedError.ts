import DOM_ElementRetrievingFailedErrorLocalization__English
  from "./DOM_ElementRetrievingFailedErrorLocalization__English";


class DOM_ElementRetrievingFailedError extends Error {

  public static readonly NAME: string = "DOM_ElementRetrievingFailedError";
  public static get DEFAULT_TITLE(): string {
    return DOM_ElementRetrievingFailedError.localization.defaultTitle;
  }


  private static localization: DOM_ElementRetrievingFailedError.Localization =
      DOM_ElementRetrievingFailedErrorLocalization__English;


  public static setLocalization(localization: DOM_ElementRetrievingFailedError.Localization): void {
    DOM_ElementRetrievingFailedError.localization = localization;
  }


  public constructor(parametersObject: DOM_ElementRetrievingFailedError.ConstructorParametersObject) {

    super();

    this.name = DOM_ElementRetrievingFailedError.NAME;

    if ("customMessage" in parametersObject) {
      this.message = parametersObject.customMessage;
    } else {
      this.message = DOM_ElementRetrievingFailedError.localization.genericDescriptionPartTemplate(parametersObject);
    }
  }
}


namespace DOM_ElementRetrievingFailedError {

  export type ConstructorParametersObject = Localization.GenericDescriptionPartTemplateParameters | { customMessage: string; };

  export type Localization = {
    readonly defaultTitle: string;
    readonly genericDescriptionPartTemplate: (
      parametersObject: Localization.GenericDescriptionPartTemplateParameters
    ) => string;
  };

  export namespace Localization {
    export type GenericDescriptionPartTemplateParameters = {
      selector: string;
    };
  }
}


export default DOM_ElementRetrievingFailedError;
