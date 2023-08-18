import {
  Logger,
  DOM_ElementRetrievingFailedError,
  UnexpectedEventError,
  isUndefined
} from "@yamato-daiwa/es-extensions";


export default function getExpectedToBeSingleDOM_Element(
  compoundParameter: Readonly<{
    selector: string;
    context?: ParentNode;
  }>
): Element;

export default function getExpectedToBeSingleDOM_Element<DOM_ElementSubtype extends Element>(
  compoundParameter: Readonly<{
    selector: string;
    context?: ParentNode;
    expectedDOM_ElementSubtype: new () => DOM_ElementSubtype;
  }>
): DOM_ElementSubtype;


export default function getExpectedToBeSingleDOM_Element<DOM_ElementSubtype extends Element>(
  {
    selector,
    context = document,
    expectedDOM_ElementSubtype
  }: Readonly<{
    selector: string;
    context?: ParentNode;
    expectedDOM_ElementSubtype?: new () => DOM_ElementSubtype;
  }>
): Element | DOM_ElementSubtype {

  const targetElementSearchResults: Array<Element> = Array.from(context.querySelectorAll(selector));

  if (targetElementSearchResults.length === 0) {
    Logger.throwErrorAndLog({
      errorInstance: new DOM_ElementRetrievingFailedError({ selector }),
      title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }


  if (targetElementSearchResults.length > 1) {
    Logger.logError({
      errorType: UnexpectedEventError.NAME,
      title: UnexpectedEventError.localization.defaultTitle,
      description: `Contrary to expectations, ${ targetElementSearchResults.length } elements has been found for the selector ` +
          `'${ selector }'. First one only will be picked.`,
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }

  if (isUndefined(expectedDOM_ElementSubtype)) {
    return targetElementSearchResults[0];
  }


  const targetElement: Element = targetElementSearchResults[0];

  if (!(targetElement instanceof expectedDOM_ElementSubtype)) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        `Contrary to expectations, the picked element in not instance of '${ expectedDOM_ElementSubtype.name }'.`
      ),
      title: UnexpectedEventError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }


  return targetElement;

}
