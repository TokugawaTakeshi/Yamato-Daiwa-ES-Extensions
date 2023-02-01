import {
  isNull,
  isNotNull,
  isUndefined,
  Logger,
  UnexpectedEventError,
  DOM_ElementRetrievingFailedError
} from "@yamato-daiwa/es-extensions";


export default function delegateClickEventHandling(
  namedParameters: Readonly<{
    eventTargetSelector: string;
    delegatingContainerOrItsSelector: Element | Document | string;
    handler: (clickedElement: Element, event: MouseEvent) => unknown;
  }>
): void;

export default function delegateClickEventHandling<ClickTargetElement extends Element>(
  namedParameters: Readonly<{
    eventTargetSelector: string;
    delegatingContainerOrItsSelector: Element | Document | string;
    eventTargetElementSubtype: new () => ClickTargetElement;
    handler: (clickedElement: ClickTargetElement, event: MouseEvent) => unknown;
  }>
): void;


export default function delegateClickEventHandling<ClickTargetElement extends Element = Element>(
  {
    eventTargetSelector,
    delegatingContainerOrItsSelector,
    eventTargetElementSubtype,
    handler
  }: Readonly<{
    eventTargetSelector: string;
    delegatingContainerOrItsSelector: Element | Document | string;
    eventTargetElementSubtype?: new () => ClickTargetElement;
    handler: (clickedElement: ClickTargetElement | Element, event: MouseEvent) => unknown;
  }>
): void {

  let delegatingContainer: Element | Document;

  if (delegatingContainerOrItsSelector instanceof Element || delegatingContainerOrItsSelector instanceof Document) {
    delegatingContainer = delegatingContainerOrItsSelector;
  } else {

    const potentialDelegatingContainer: Element | null = document.querySelector(delegatingContainerOrItsSelector);

    if (isNull(potentialDelegatingContainer)) {

      Logger.logError({
        errorType: DOM_ElementRetrievingFailedError.NAME,
        title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
        description: DOM_ElementRetrievingFailedError.localization.generateDescription({
          selector: delegatingContainerOrItsSelector
        }),
        occurrenceLocation: "delegateClickEventHandling(namedParameters)"
      });
      return;
    }


    delegatingContainer = potentialDelegatingContainer;
  }


  delegatingContainer.addEventListener("click", (event: Event): void => {

    if (!(event instanceof MouseEvent)) {
      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: "We are sorry, but it is a bug. The event is not an instance of 'MouseEvent'. We need to investigate it. " +
            "Please consider the opening issue in https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/issues and append " +
            "the reproducing example.",
        occurrenceLocation: "delegateClickEventHandling(namedParameters)"
      });
      return;
    }


    /* [ Theory ] The "event.target" has type "EventTarget" while ".parentElement" property has type "HTMLElement"  */
    if (!(event.target instanceof HTMLElement)) {
      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: "We are sorry, but it is a bug. The event target is not an instance of 'HTMLElement'. " +
            "We need to investigate it. Please consider the opening issue in " +
            "https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/issues and append the reproducing example.",
        occurrenceLocation: "delegateClickEventHandling(namedParameters)"
      });
      return;
    }


    for (
      let parentElement: HTMLElement | null = event.target;
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
            title: UnexpectedEventError.localization.defaultTitle,
            description: `Contrary to expectations, the event target is not instance of '${ eventTargetElementSubtype.name }'.`,
            occurrenceLocation: "delegateClickEventHandling(namedParameters)"
          });
          return;
        }


        handler(parentElement, event);
      }
    }
  }, false);
}
