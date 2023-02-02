import {
  Logger,
  InvalidParameterValueError,
  isString,
  isNotUndefined,
  isUndefined
} from "@yamato-daiwa/es-extensions";
import getExpectedToBeSingleDOM_Element from "./getExpectedToBeSingleDOM_Element";


export default function getExpectedToBeSingleChildOfTemplateElement<DOM_ElementSubtype extends Element>(
  compoundParameter: Readonly<
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
  compoundParameter: Readonly<
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
  compoundParameter: Readonly<
    (
      { templateElement: HTMLTemplateElement; } |
      { templateElementSelector: string; }
    ) &
    {
      expectedChildElementSubtype?: new () => DOM_ElementSubtype;
      context?: Element | Document;
      mustReplaceTemplateElementOnceDoneWith?: Node;
      mustRemoveTemplateElementOnceDone?: boolean;
    }
  >
): Element | DOM_ElementSubtype {

  const templateElement: HTMLTemplateElement = "templateElement" in compoundParameter ?
      compoundParameter.templateElement :
      getExpectedToBeSingleDOM_Element({
        selector: compoundParameter.templateElementSelector,
        expectedDOM_ElementSubtype: HTMLTemplateElement,
        context: compoundParameter.context
      });

  const childrenNodes: HTMLCollection = templateElement.content.children;

  if (childrenNodes.length === 0) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart: "Specified \"templateElement\" is empty."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleChildOfTemplateElement(compoundParameter)"
    });
  }


  if (childrenNodes.length > 1) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart: `Specified "templateElement" has more than one child: \n${ templateElement.outerHTML }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleChildOfTemplateElement(compoundParameter)"
    });
  }


  if (isUndefined(compoundParameter.expectedChildElementSubtype)) {
    return childrenNodes[0];
  }


  const directChildOfTemplateElement: Element | null = childrenNodes[0];

  if (
    !isString(compoundParameter) &&
    !(directChildOfTemplateElement instanceof compoundParameter.expectedChildElementSubtype)
  ) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter",
        messageSpecificPart: "The child of specified \"templateElement\" is not the instance of " +
            `${ compoundParameter.expectedChildElementSubtype.name }`
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "getExpectedToBeSingleChildOfTemplateElement(compoundParameter)"
    });
  }


  if (isNotUndefined(compoundParameter.mustReplaceTemplateElementOnceDoneWith)) {
    templateElement.replaceWith(compoundParameter.mustReplaceTemplateElementOnceDoneWith);
  } else if (compoundParameter.mustRemoveTemplateElementOnceDone === true) {
    templateElement.remove();
  }

  return directChildOfTemplateElement;

}
