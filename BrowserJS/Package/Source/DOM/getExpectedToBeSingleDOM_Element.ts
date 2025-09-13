import {
  Logger,
  DOM_ElementRetrievingFailedError,
  UnexpectedEventError,
  isUndefined
} from "@yamato-daiwa/es-extensions";


export default function getExpectedToBeSingleDOM_Element(
  compoundParameter: Readonly<{
    selector: string;
    contextElement?: ParentNode | Readonly<{ selector: string; }>;
  }>
): Element;

export default function getExpectedToBeSingleDOM_Element<DOM_ElementSubtype extends Element>(
  compoundParameter: Readonly<{
    selector: string;
    contextElement?: ParentNode | Readonly<{ selector: string; }>;
    expectedDOM_ElementSubtype: new () => DOM_ElementSubtype;
  }>
): DOM_ElementSubtype;


export default function getExpectedToBeSingleDOM_Element<DOM_ElementSubtype extends Element>(
  compoundParameter: Readonly<{
    selector: string;
    contextElement?: ParentNode | Readonly<{ selector: string; }>;
    expectedDOM_ElementSubtype?: new () => DOM_ElementSubtype;
  }>
): Element | DOM_ElementSubtype {

  let contextElement: ParentNode;

  if (isUndefined(compoundParameter.contextElement)) {
    contextElement = document;
  } else if ("selector" in compoundParameter.contextElement) {

    const elementsCorrespondingToContextElementSelector: NodeListOf<ParentNode> = document.
        querySelectorAll(compoundParameter.contextElement.selector);

    if (elementsCorrespondingToContextElementSelector.length === 0) {

      Logger.throwErrorWithFormattedMessage({
        errorInstance: new DOM_ElementRetrievingFailedError({
          customMessage:
              `The context element has not been found by the selector "${ compoundParameter.contextElement.selector }".`
        }),
        title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
        occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
      });

    } else if (elementsCorrespondingToContextElementSelector.length > 1) {

      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description:
            `Multiple elements are corresponding to context element selector "${ compoundParameter.contextElement.selector }" ` +
              "while the context element must be single.",
        occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
      });

    }


    contextElement = elementsCorrespondingToContextElementSelector[0];

  } else {
    contextElement = compoundParameter.contextElement;
  }


  const targetElementSelector: string = compoundParameter.selector;
  const elementsCorrespondingToTargetElementSelector: NodeListOf<Element> =
      contextElement.querySelectorAll(targetElementSelector);

  if (elementsCorrespondingToTargetElementSelector.length === 0) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new DOM_ElementRetrievingFailedError({ selector: targetElementSelector }),
      title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }


  if (elementsCorrespondingToTargetElementSelector.length > 1) {
    Logger.logError({
      errorType: UnexpectedEventError.NAME,
      title: UnexpectedEventError.localization.defaultTitle,
      description:
          `Contrary to expectations, ${ elementsCorrespondingToTargetElementSelector.length } elements has been found for the ` +
            `selector "${ targetElementSelector }". ` +
          "First one will be picked.",
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }


  const targetElement: Element = elementsCorrespondingToTargetElementSelector[0];

  if (isUndefined(compoundParameter.expectedDOM_ElementSubtype)) {
    return targetElement;
  }


  if (!(targetElement instanceof compoundParameter.expectedDOM_ElementSubtype)) {
    Logger.throwErrorWithFormattedMessage({
      errorInstance: new UnexpectedEventError(
        "Contrary to expectations, the picked element in not instance of " +
            `"${ compoundParameter.expectedDOM_ElementSubtype.name }".`
      ),
      title: UnexpectedEventError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleDOM_Element(compoundParameter)"
    });
  }


  return targetElement;

}
