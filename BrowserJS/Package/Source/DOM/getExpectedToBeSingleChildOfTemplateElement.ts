import {
  Logger,
  ImproperUsageError,
  UnexpectedEventError,
  isString,
  isNotUndefined,
  isUndefined
} from "@yamato-daiwa/es-extensions";
import getExpectedToBeSingleDOM_Element from "./getExpectedToBeSingleDOM_Element";


export default function getExpectedToBeSingleChildOfTemplateElement<DOM_ElementSubtype extends Element>(
    namedParameters: Readonly<
      (
        { templateElement: HTMLTemplateElement; } |
        { templateElementSelector: string; }
      ) &
      {
        expectedChildElementSubtype: new () => DOM_ElementSubtype;
        context?: Element | Document;
        mustReplaceTemplateElementOnceDoneWith?: Node;
        mustRemoveTemplateElementOnceDone?: boolean;
      }
    >
): DOM_ElementSubtype;

export default function getExpectedToBeSingleChildOfTemplateElement(
    namedParameters: Readonly<
      (
        { templateElement: HTMLTemplateElement; } |
        { templateElementSelector: string; }
      ) &
      {
        context?: Element | Document;
        mustReplaceTemplateElementOnceDoneWith?: Node;
        mustRemoveTemplateElementOnceDone?: boolean;
      }
    >
): Element;


export default function getExpectedToBeSingleChildOfTemplateElement<DOM_ElementSubtype extends Element>(
  namedParameters: Readonly<
      (
        { templateElement: HTMLTemplateElement; } |
        { templateElementSelector: string; }
        ) & {
          expectedChildElementSubtype?: new () => DOM_ElementSubtype;
          context?: Element | Document;
          mustReplaceTemplateElementOnceDoneWith?: Node;
          mustRemoveTemplateElementOnceDone?: boolean;
        }
      >
): Element | DOM_ElementSubtype {

  const templateElement: HTMLTemplateElement = "templateElement" in namedParameters ?
      namedParameters.templateElement :
      getExpectedToBeSingleDOM_Element({
        selector: namedParameters.templateElementSelector,
        expectedDOM_ElementSubtype: HTMLTemplateElement,
        context: namedParameters.context
      });

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


  if (isUndefined(namedParameters.expectedChildElementSubtype)) {
    return childrenNodes[0];
  }


  const directChildOfTemplateElement: Element | null = childrenNodes[0];

  if (
    !isString(namedParameters) &&
    !(directChildOfTemplateElement instanceof namedParameters.expectedChildElementSubtype)
  ) {
    Logger.throwErrorAndLog({
      errorInstance: new UnexpectedEventError(
        "Contrary to expectations, the child of 'template' element is not instance of " +
        `'${ namedParameters.expectedChildElementSubtype.name }'.`
      ),
      occurrenceLocation: "getExpectedToBeSingleChildOfTemplateElement(templateElement | namedParameters)",
      title: ImproperUsageError.localization.defaultTitle
    });
  }


  if (isNotUndefined(namedParameters.mustReplaceTemplateElementOnceDoneWith)) {
    templateElement.replaceWith(namedParameters.mustReplaceTemplateElementOnceDoneWith);
  } else if (namedParameters.mustRemoveTemplateElementOnceDone === true) {
    templateElement.remove();
  }

  return directChildOfTemplateElement;
}
