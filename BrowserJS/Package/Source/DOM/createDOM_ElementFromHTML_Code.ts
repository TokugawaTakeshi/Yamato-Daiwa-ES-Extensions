import {
  Logger,
  InvalidParameterValueError,
  ImproperUsageError,
  isUndefined,
  isString
} from "@yamato-daiwa/es-extensions";
import createHTML_CollectionFromHTML_Code from "./createHTML_CollectionFromHTML_Code";


export default function createDOM_ElementFromHTML_Code(HTML_Code: string): Element;

export default function createDOM_ElementFromHTML_Code<DOM_ElementSubtype extends Element>(
  compoundParameter: Readonly<{
    HTML_Code: string;
    rootDOM_ElementSubtype: new () => DOM_ElementSubtype;
  }>
): DOM_ElementSubtype;


export default function createDOM_ElementFromHTML_Code<DOM_ElementSubtype extends Element>(
  variadicParameter: string | Readonly<{ HTML_Code: string; rootDOM_ElementSubtype?: new () => DOM_ElementSubtype; }>
): Element | DOM_ElementSubtype {

  let HTML_Code: string;
  let RootDOM_ElementSubtype: (new () => DOM_ElementSubtype) | undefined;

  if (isString(variadicParameter)) {
    HTML_Code = variadicParameter;
  } else {
    HTML_Code = variadicParameter.HTML_Code;
    RootDOM_ElementSubtype = variadicParameter.rootDOM_ElementSubtype;
  }


  const DOM_ElementsHTML_Collection: HTMLCollection = createHTML_CollectionFromHTML_Code(HTML_Code);

  if (DOM_ElementsHTML_Collection.length === 0) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        customMessage: "Unable to create the single DOM element because below HTML code does not include the root element. " +
            `\n${ HTML_Code }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "createDOM_ElementFromHTML_Code(variadicParameter)"
    });
  }


  if (DOM_ElementsHTML_Collection.length > 1) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new ImproperUsageError(
        "Unable to create the single DOM element because below HTML code has multiple root elements. " +
        "If you want to support multiple root elements scenario, use \"createHTML_CollectionFromHTML_Code\" function instead." +
        `\n${ HTML_Code }`
      ),
      title: ImproperUsageError.localization.defaultTitle,
      occurrenceLocation: "createDOM_ElementFromHTML_Code(variadicParameter)"
    });
  }


  if (isUndefined(RootDOM_ElementSubtype)) {
    return DOM_ElementsHTML_Collection[0];
  }


  const rootDOM_Element: Element = DOM_ElementsHTML_Collection[0];

  if (!(rootDOM_Element instanceof RootDOM_ElementSubtype)) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new InvalidParameterValueError({
        customMessage: `The root element in below HTML code is not instance of "${ RootDOM_ElementSubtype.name }".` +
            `\n${ HTML_Code }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "createDOM_ElementFromHTML_Code(variadicParameter)"
    });
  }


  return rootDOM_Element;

}
