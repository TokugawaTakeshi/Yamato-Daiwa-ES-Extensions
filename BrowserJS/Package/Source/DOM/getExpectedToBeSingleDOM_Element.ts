import {
  Logger,
  DOM_ElementRetrievingFailedError,
  UnexpectedEventError,
  isUndefined
} from "@yamato-daiwa/es-extensions";


export default function getExpectedToBeSingleDOM_Element(
  compoundParameter: {
    selector: string;
    context?: Element | Document;
  }
): Element;

export default function getExpectedToBeSingleDOM_Element<DOM_ElementSubtype extends Element>(
  compoundParameter: {
    selector: string;
    context?: Element | Document;
    targetDOM_ElementSubtype: new () => DOM_ElementSubtype;
  }
): DOM_ElementSubtype;


export default function getExpectedToBeSingleDOM_Element<DOM_ElementSubtype extends Element>(
  {
    selector,
    context = document,
    targetDOM_ElementSubtype
  }: {
    selector: string;
    context?: Element | Document;
    targetDOM_ElementSubtype?: new () => DOM_ElementSubtype;
  }
): Element | DOM_ElementSubtype {

  const targetElementSearchRequestMatch: Array<Element> = Array.from(context.querySelectorAll(selector));

  if (targetElementSearchRequestMatch.length === 0) {
    Logger.throwErrorAndLog({
      errorInstance: new DOM_ElementRetrievingFailedError({ selector }),
      title: UnexpectedEventError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }


  if (targetElementSearchRequestMatch.length > 1) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        `Contrary to expectations, ${ targetElementSearchRequestMatch.length } elements has been found for the selector ` +
        `'${ selector }'.`
      ),
      title: UnexpectedEventError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }


  if (isUndefined(targetDOM_ElementSubtype)) {
    return targetElementSearchRequestMatch[0];
  }


  const targetElement: Element = targetElementSearchRequestMatch[0];

  if (!(targetElement instanceof targetDOM_ElementSubtype)) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        `The subtype of picked element does match with expected subtype '${ targetDOM_ElementSubtype.name }'.`
      ),
      title: UnexpectedEventError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }


  return targetElement;
}
