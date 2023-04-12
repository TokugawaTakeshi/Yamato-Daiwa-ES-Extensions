import {
  isNull,
  isNotNull,
  isUndefined,
  Logger,
  UnexpectedEventError,
  DOM_ElementRetrievingFailedError,
  PoliteErrorsMessagesBuilder
} from "@yamato-daiwa/es-extensions";


export default function delegateClickEventHandling(
  compoundParameter: Readonly<{
    eventTargetSelector: string;
    delegatingContainerOrItsSelector: Element | Document | string;
    handler: (clickedElement: Element, event: MouseEvent) => unknown;
  }>
): void;

export default function delegateClickEventHandling<ClickTargetElement extends Element>(
  compoundParameter: Readonly<{
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
        occurrenceLocation: "delegateClickEventHandling(compoundParameter)"
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
        description: PoliteErrorsMessagesBuilder.buildMessage({
          technicalDetails: "The subtype of \"event\" variable of addEventListener(\"click\" is not the instance of " +
              "\"MouseEvent\"",
          politeExplanation: "Using native addEventListener(\"click\") we did expected that the subtype of \"event\", " +
              "the first parameter of the callback, will be the instance of \"MouseEvent\". The TypeScript types definitions " +
              "does not provide the overload for each type of event, so the \"event\" has been annotated just as \"Event\". " +
              "It must be the the instance of \"MouseEvent\" subtype, however, as this occurrence shows, under certain " +
              "combination of circumstances it is not such as."
        }),
        occurrenceLocation: "delegateClickEventHandling(compoundParameter)"
      });

      return;

    }


    /* [ Theory ] The "event.target" has type "EventTarget" while ".parentElement" property has type "HTMLElement"  */
    if (!(event.target instanceof HTMLElement)) {

      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: PoliteErrorsMessagesBuilder.buildMessage({
          technicalDetails: "The \"event.target\" is not the instance of \"HTMLElement\".",
          politeExplanation: "To reach the container to which the click event has been delegated by valid TypeScript," +
              "we had to check is \"event.target\" the instance of \"HTMLElement\". Theoretically, the \"event.target\" " +
              "has type \"EventTarget\" while \".parentElement\" property has type \"HTMLElement\", however this bug " +
              "occurrence indicates the presence of exceptions which we need to investigate."
        }),
        occurrenceLocation: "delegateClickEventHandling(compoundParameter)"
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
            occurrenceLocation: "delegateClickEventHandling(compoundParameter)"
          });

          return;

        }


        handler(parentElement, event);
      }
    }
  }, false);
}
