import { Logger, ImproperUsageError, UnexpectedEventError, isString } from "@yamato-daiwa/es-extensions";
import getExpectedToBeSingleDOM_Element from "./getExpectedToBeSingleDOM_Element";


export default function getExpectedToBeSingleChildOfTemplateElement(
  templateElementOrItsSelector: HTMLTemplateElement | string
): Element;

export default function getExpectedToBeSingleChildOfTemplateElement<DOM_ElementSubtype extends Element>(
  namedParameters: Readonly<
    (
      { templateElement: HTMLTemplateElement; } |
      { templateElementSelector: string; }
    ) & {
      expectedChildElementSubtype: new () => DOM_ElementSubtype;
      context?: Element | Document;
    }
  >
): DOM_ElementSubtype;


export default function getExpectedToBeSingleChildOfTemplateElement<DOM_ElementSubtype extends Element>(
  polymorphicParameter: HTMLTemplateElement | string | Readonly<
      (
        { templateElement: HTMLTemplateElement; } |
        { templateElementSelector: string; }
        ) & {
          expectedChildElementSubtype: new () => DOM_ElementSubtype;
          context?: Element | Document;
        }
      >
): Element | DOM_ElementSubtype {

  let templateElement: HTMLTemplateElement;

  if (polymorphicParameter instanceof HTMLTemplateElement) {

    templateElement = polymorphicParameter;

  } else if (isString(polymorphicParameter)) {

    templateElement = getExpectedToBeSingleDOM_Element({
      selector: polymorphicParameter,
      expectedDOM_ElementSubtype: HTMLTemplateElement
    });

  } else if ("templateElement" in polymorphicParameter) {

    templateElement = polymorphicParameter.templateElement;

  } else {

    templateElement = getExpectedToBeSingleDOM_Element({
      selector: polymorphicParameter.templateElementSelector,
      expectedDOM_ElementSubtype: HTMLTemplateElement,
      context: polymorphicParameter.context
    });
  }


  const childrenNodes: HTMLCollection = templateElement.content.children;

  if (childrenNodes.length === 0) {
    Logger.throwErrorAndLog({
      errorInstance: new ImproperUsageError("Target template element is empty."),
      occurrenceLocation: "getExpectedToBeSingleChildOfTemplateElement(templateElement | namedParameters)",
      title: ImproperUsageError.localization.defaultTitle
    });
  }


  if (childrenNodes.length > 1) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        `Contrary to expectations, target 'template'"' element has more than one child:\n${ templateElement.outerHTML }`
      ),
      occurrenceLocation: "getExpectedToBeSingleChildOfTemplateElement(templateElement | namedParameters)",
      title: ImproperUsageError.localization.defaultTitle
    });
  }


  if (!isString(polymorphicParameter) && !("expectedChildElementSubtype" in polymorphicParameter)) {
    return childrenNodes[0];
  }


  const directChildOfTemplateElement: Element | null = childrenNodes[0];

  if (
    !isString(polymorphicParameter) &&
    !(directChildOfTemplateElement instanceof polymorphicParameter.expectedChildElementSubtype)
  ) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        "Contrary to expectations, the child of 'template' element is not instance of " +
        `'${ polymorphicParameter.expectedChildElementSubtype.name }'.`
      ),
      occurrenceLocation: "getExpectedToBeSingleChildOfTemplateElement(templateElement | namedParameters)",
      title: ImproperUsageError.localization.defaultTitle
    });
  }


  return directChildOfTemplateElement;
}
