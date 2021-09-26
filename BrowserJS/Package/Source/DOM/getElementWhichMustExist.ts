import { Logger, DOM_ElementRetrievingFailedError } from "@yamato-daiwa/es-extensions";


export default function getElementWhichMustExist<SpecificElement extends Element>(
  {
    selector,
    context = document

  }: {
    selector: string;
    context?: Element | Document;
  }
): SpecificElement {

  const targetElement: SpecificElement | null = context.querySelector<SpecificElement>(selector);

  if (targetElement === null) {
    Logger.throwErrorAndLog({
      errorInstance: new DOM_ElementRetrievingFailedError({ selector }),
      occurrenceLocation: "getElementWhichMustExist(parametersObject)",
      title: DOM_ElementRetrievingFailedError.DEFAULT_TITLE
    });
  }

  return targetElement;
}
