import {
  Logger,
  InvalidParameterValueError,
  ImproperUsageError,
  UnexpectedEventError,
  isUndefined,
  isString
} from "@yamato-daiwa/es-extensions";
import createHTML_CollectionFromHTML_Code from "./createHTML_CollectionFromHTML_Code";


export default function createDOM_ElementFromHTML_Code(HTML_Code: string): Element;

export default function createDOM_ElementFromHTML_Code<DOM_ElementSubtype extends Element>(
  namedParameters: {
    HTML_Code: string;
    rootDOM_ElementSubtype: new () => DOM_ElementSubtype;
  }
): DOM_ElementSubtype;


export default function createDOM_ElementFromHTML_Code<DOM_ElementSubtype extends Element>(
  HTML_CodeOrNamedParameters: string | { HTML_Code: string; rootDOM_ElementSubtype?: new () => DOM_ElementSubtype; }
): Element | DOM_ElementSubtype {

  let HTML_Code: string;
  let rootDOM_ElementSubtype: (new () => DOM_ElementSubtype) | undefined;

  if (isString(HTML_CodeOrNamedParameters)) {
    HTML_Code = HTML_CodeOrNamedParameters;
  } else {
    HTML_Code = HTML_CodeOrNamedParameters.HTML_Code;
    rootDOM_ElementSubtype = HTML_CodeOrNamedParameters.rootDOM_ElementSubtype;
  }


  const DOM_ElementsHTML_Collection: HTMLCollection = createHTML_CollectionFromHTML_Code(HTML_Code);

  if (DOM_ElementsHTML_Collection.length === 0) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        customMessage: "Unable to create the single DOM element because below HTML code does not include the root element " +
            `which must be first and only. \n${ HTML_Code }`
      }),
      occurrenceLocation: "createDOM_ElementFromHTML_Code(HTML_CodeOrNamedParameters)",
      title: ImproperUsageError.localization.defaultTitle
    });
  }


  if (DOM_ElementsHTML_Collection.length > 1) {
    Logger.throwErrorAndLog({
      errorInstance: new ImproperUsageError(
        "Unable to create the single DOM element because below HTML code has multiple root elements. If you want to support " +
        `multiple root elements scenario, use 'createHTML_CollectionFromHTML_Code' function instead.\n${ HTML_Code }`
      ),
      occurrenceLocation: "createDOM_ElementFromHTML_Code(HTML_CodeOrNamedParameters)",
      title: ImproperUsageError.localization.defaultTitle
    });
  }


  if (isUndefined(rootDOM_ElementSubtype)) {
    return DOM_ElementsHTML_Collection[0];
  }


  const rootDOM_Element: Element = DOM_ElementsHTML_Collection[0];

  if (!(rootDOM_Element instanceof rootDOM_ElementSubtype)) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(`The created DOM element is not instance of '${ rootDOM_ElementSubtype.name }'.`),
      title: UnexpectedEventError.localization.defaultTitle,
      occurrenceLocation: "createDOM_ElementFromHTML_Code(HTML_CodeOrNamedParameters)"
    });
  }


  return rootDOM_Element;
}
