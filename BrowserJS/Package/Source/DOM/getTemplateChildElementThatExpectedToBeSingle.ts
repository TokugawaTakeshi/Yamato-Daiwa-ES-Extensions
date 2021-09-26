import { Logger, ImproperUsageError } from "@yamato-daiwa/es-extensions";


export default function getTemplateChildElementThatExpectedToBeSingle(templateElement: HTMLTemplateElement): Element {

  const childrenNodes: HTMLCollection = templateElement.content.children;

  if (childrenNodes.length === 0) {
    Logger.throwErrorAndLog({
      errorInstance: new ImproperUsageError("Target template element is empty."),
      occurrenceLocation: "getTemplateChildElementThatExpectedToBeSingle(parametersObject)",
      title: ImproperUsageError.DEFAULT_TITLE
    });
  }

  if (childrenNodes.length > 1) {
    Logger.throwErrorAndLog({
      errorInstance: new ImproperUsageError(
        `Can not return single template's child element because it has multiple children:\n${templateElement.outerHTML}`
      ),
      occurrenceLocation: "getTemplateChildElementThatExpectedToBeSingle(parametersObject)",
      title: ImproperUsageError.DEFAULT_TITLE
    });
  }

  return childrenNodes[0];
}
