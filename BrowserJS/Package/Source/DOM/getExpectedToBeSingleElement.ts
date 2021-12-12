import {
  Logger,
  DOM_ElementRetrievingFailedError,
  UnexpectedEventError,
  isUndefined
} from "@yamato-daiwa/es-extensions";


export function getExpectedToBeSingleElement(
  parametersObject: {
    selector: string;
    context?: Element | Document;
  }
): Element;

export function getExpectedToBeSingleElement<SpecificElement extends Element>(
  parametersObject: {
    selector: string;
    context?: Element | Document;
    elementTypeChecker: (element: Element) => element is SpecificElement;
  }
): SpecificElement;


export default function getExpectedToBeSingleElement<SpecificElement extends Element>(
  {
    selector,
    context = document,
    elementTypeChecker
  }: {
    selector: string;
    context?: Element | Document;
    elementTypeChecker?: (element: Element) => element is SpecificElement;
  }
): SpecificElement {

  const targetElementSearchRequestMatch: Array<Element> = Array.from(context.querySelectorAll(selector));

  if (targetElementSearchRequestMatch.length === 0) {
    Logger.throwErrorAndLog({
      errorInstance: new DOM_ElementRetrievingFailedError({ selector }),
      title: UnexpectedEventError.DEFAULT_TITLE,
      occurrenceLocation: "getExpectedToBeSingleElement(parametersObject)"
    });
  }


  if (targetElementSearchRequestMatch.length > 1) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        `Contrary to expectations, ${targetElementSearchRequestMatch.length} elements has been found for the selector ` +
        `"${selector}."`
      ),
      title: UnexpectedEventError.DEFAULT_TITLE,
      occurrenceLocation: "getExpectedToBeSingleElement(parametersObject)"
    });
  }


  if (isUndefined(elementTypeChecker)) {
    return targetElementSearchRequestMatch[0];
  }


  const targetElement: Element = targetElementSearchRequestMatch[0];

  if (!elementTypeChecker(targetElement)) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        "The picked element subtype does match with expected one specified in 'elementTypeChecker'"
      ),
      title: UnexpectedEventError.DEFAULT_TITLE,
      occurrenceLocation: "getExpectedToBeSingleElement(parametersObject)"
    });
  }


  return targetElement;
}
