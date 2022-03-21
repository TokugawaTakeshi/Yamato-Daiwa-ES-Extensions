import {
  isNull,
  isNotNull,
  isUndefined,
  Logger,
  UnexpectedEventError, DOM_ElementRetrievingFailedError
} from "@yamato-daiwa/es-extensions";


export default function delegateClickEventHandling(
  compoundParameter: {
    eventTargetSelector: string;
    delegatingContainerOrIt_sSelector: Element | Document | string;
    handler: (clickedElement: Element, event: MouseEvent) => unknown;
  }
): void;

export default function delegateClickEventHandling<ClickTargetElement extends Element>(
  compoundParameter: {
    eventTargetSelector: string;
    delegatingContainerOrIt_sSelector: Element | Document | string;
    eventTargetElementSubtype: new () => ClickTargetElement;
    handler: (clickedElement: ClickTargetElement, event: MouseEvent) => unknown;
  }
): void;


export default function delegateClickEventHandling<ClickTargetElement extends Element = Element>(
  {
    eventTargetSelector,
    delegatingContainerOrIt_sSelector,
    eventTargetElementSubtype,
    handler
  }: {
    eventTargetSelector: string;
    delegatingContainerOrIt_sSelector: Element | Document | string;
    eventTargetElementSubtype?: new () => ClickTargetElement;
    handler: (clickedElement: ClickTargetElement | Element, event: MouseEvent) => unknown;
  }
): void {

  let delegatingContainer: Element | Document;

  if (delegatingContainerOrIt_sSelector instanceof Element || delegatingContainerOrIt_sSelector instanceof Document) {
    delegatingContainer = delegatingContainerOrIt_sSelector;
  } else {

    const potentialDelegatingContainer: Element | null = document.querySelector(delegatingContainerOrIt_sSelector);

    if (isNull(potentialDelegatingContainer)) {
      Logger.throwErrorAndLog({
        errorInstance: new DOM_ElementRetrievingFailedError({
          selector: delegatingContainerOrIt_sSelector
        }),
        title: UnexpectedEventError.DEFAULT_TITLE,
        occurrenceLocation: "delegateClickEventHandling(compoundParameter)"
      });
    }


    delegatingContainer = potentialDelegatingContainer;
  }


  delegatingContainer.addEventListener("click", (event: Event): void => {

    if (!(event instanceof MouseEvent)) {
      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.DEFAULT_TITLE,
        description: "We are sorry, but it is a bug. The event is not instance of 'MouseEvent'. We need to investigate it. " +
            "Please consider the opening issue in https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/issues and append " +
            "the reproducting example.",
        occurrenceLocation: "delegateClickEventHandling(compoundParameter)"
      });
      return;
    }


    for (
      let parentElement: Element | null = event.target as Element;
      isNotNull(parentElement) && parentElement !== event.currentTarget;
      parentElement = parentElement.parentElement
    ) {

      if (parentElement.matches(eventTargetSelector)) {

        if (isUndefined(eventTargetElementSubtype)) {
          handler(parentElement, event);
          return;
        }


        if (!(parentElement instanceof eventTargetElementSubtype)) {
          Logger.logError({
            errorType: UnexpectedEventError.NAME,
            title: UnexpectedEventError.DEFAULT_TITLE,
            description: `Contrary to expectations, the event target is not instance of '${eventTargetElementSubtype.name}'.`,
            occurrenceLocation: "delegateClickEventHandling(compoundParameter)"
          });
          return;
        }


        handler(parentElement, event);
      }
    }
  }, false);
}
