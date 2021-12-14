import {
  Logger,
  ImproperUsageError,
  UnexpectedEventError,
  isUndefined
} from "@yamato-daiwa/es-extensions";
import createElements from "./createElements";


export default function createElement(
  parametersObject: {
    HTML_Code: string;
  }
): Element;

export default function createElement<SpecificElement extends Element>(
  parametersObject: {
    HTML_Code: string;
    rootElementTypeChecker: (rootElement: Element) => rootElement is SpecificElement;
  }
): SpecificElement;


export default function createElement<SpecificElement extends Element>(
  {
    HTML_Code,
    rootElementTypeChecker
  }: {
    HTML_Code: string;
    rootElementTypeChecker?: (element: Element) => element is SpecificElement;
  }
): Element | SpecificElement {

  const elementsCollection: HTMLCollection = createElements(HTML_Code);

  if (elementsCollection.length > 1) {
    Logger.throwErrorAndLog({
      errorInstance: new ImproperUsageError(
        "Unable to create the single element because below HTML code has multiple root elements. Is you want to support " +
        `multiple root elements scenario, use 'createElements' function instead.\n${HTML_Code}`
      ),
      occurrenceLocation: "createElement(HTML_Code)",
      title: ImproperUsageError.DEFAULT_TITLE
    });
  }


  if (isUndefined(rootElementTypeChecker)) {
    return elementsCollection[0];
  }


  const targetElement: Element = elementsCollection[0];

  if (!rootElementTypeChecker(targetElement)) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        "Unable to cast the created element to type specified in 'rootElementTypeChecker' because type check has not " +
        "passed"
      ),
      title: UnexpectedEventError.DEFAULT_TITLE,
      occurrenceLocation: "createElement(HTML_Code)"
    });
  }


  return targetElement;
}
