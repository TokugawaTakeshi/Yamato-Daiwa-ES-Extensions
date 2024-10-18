import {
  isNotNull,
  isUndefined,
  Logger,
  UnexpectedEventError,
  DOM_ElementRetrievingFailedError,
  PoliteErrorsMessagesBuilder
} from "@yamato-daiwa/es-extensions";
import getExpectedToBeSingleDOM_Element from "../../DOM/getExpectedToBeSingleDOM_Element";
import EventPropagationTypes from "../EventPropagationTypes";


export default class DelegatedLeftClickEventListener {

  protected readonly delegatingContainer: Element | Document;
  protected readonly externalHandlersBySelectors: Readonly<{
    [selector: string]: (clickedElement: Element, event: MouseEvent) => unknown;
  }>;
  private readonly eventPropagation: EventPropagationTypes | false;
  private readonly mustBeCalledOnce: boolean;
  private readonly mustKeepDefaultBehaviour: boolean;

  /* [ Theory ] A new function reference is created after `.bind()` is called, so the reference must be single. */
  private readonly boundOnLeftClickEventHandler: (event: Event) => void;

  public constructor(
    initializationProperties: Readonly<{
      delegatingContainer: Element | Document | Readonly<{ selector: string; }>;
      contextElement?: ParentNode | Readonly<{ selector: string; }>;
      handlersBySelectors: Readonly<{ [selector: string]: (clickedElement: Element, event: MouseEvent) => unknown; }>;
      eventPropagation?: EventPropagationTypes | false;
      mustBeCalledOnce?: boolean;
      mustKeepDefaultBehaviour?: boolean;
    }>
  ) {

    let delegatingContainer: Element | Document;

    if (
      initializationProperties.delegatingContainer instanceof Element ||
      initializationProperties.delegatingContainer instanceof Document
    ) {

      delegatingContainer = initializationProperties.delegatingContainer;

    } else {

      let contextElement: ParentNode;

      if (isUndefined(initializationProperties.contextElement)) {

        contextElement = document;

      } else if ("selector" in initializationProperties.contextElement) {

        const elementsCorrespondingToContextElementSelector: NodeListOf<ParentNode> = document.
            querySelectorAll(initializationProperties.contextElement.selector);

        if (elementsCorrespondingToContextElementSelector.length === 0) {

          Logger.throwErrorAndLog({
            errorInstance: new DOM_ElementRetrievingFailedError({
              customMessage:
                  "The context element has not been found by the selector " +
                    `"${ initializationProperties.contextElement.selector }".`
            }),
            title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
            occurrenceLocation: "DelegatedLeftClickEventListener.constructor(initializationProperties)"
          });

        } else if (elementsCorrespondingToContextElementSelector.length > 1) {

          Logger.logError({
            errorType: UnexpectedEventError.NAME,
            title: UnexpectedEventError.localization.defaultTitle,
            description:
                "Multiple elements are corresponding to context element selector " +
                  `"${ initializationProperties.contextElement.selector }" while the context element must be single.`,
            occurrenceLocation: "DelegatedLeftClickEventListener.constructor(initializationProperties)"
          });

        }


        contextElement = elementsCorrespondingToContextElementSelector[0];

      } else {

        contextElement = initializationProperties.contextElement;

      }

      delegatingContainer = getExpectedToBeSingleDOM_Element({
        selector: initializationProperties.delegatingContainer.selector,
        contextElement,
        expectedDOM_ElementSubtype: HTMLButtonElement
      });

    }

    this.delegatingContainer = delegatingContainer;
    this.externalHandlersBySelectors = initializationProperties.handlersBySelectors;
    this.boundOnLeftClickEventHandler = this.onLeftClick.bind(this);

    this.eventPropagation = initializationProperties.eventPropagation ?? EventPropagationTypes.bubbling;
    this.mustBeCalledOnce = initializationProperties.mustBeCalledOnce ?? false;
    this.mustKeepDefaultBehaviour = initializationProperties.mustKeepDefaultBehaviour ?? false;

    delegatingContainer.addEventListener(
      "click",
      this.boundOnLeftClickEventHandler,
      {
        capture: this.eventPropagation === EventPropagationTypes.capturing,
        once: this.mustBeCalledOnce
      }
    );

  }

  public utilize(): void {

    this.delegatingContainer.removeEventListener(
      "click",
      this.boundOnLeftClickEventHandler,
      { capture: this.eventPropagation === EventPropagationTypes.capturing }
    );

  }

  private onLeftClick(leftClickEvent: Event): void {

    if (this.eventPropagation === false) {
      leftClickEvent.stopPropagation();
    }


    if (!this.mustKeepDefaultBehaviour) {
      leftClickEvent.preventDefault();
    }


    if (!(leftClickEvent instanceof MouseEvent)) {

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
        occurrenceLocation: "delegateLeftClickEventHandling(initializationProperties)"
      });

      return;

    }


    /* [ Theory ] The "event.target" has type "EventTarget" while ".parentElement" property has type "HTMLElement"  */
    if (!(leftClickEvent.target instanceof HTMLElement)) {

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
        occurrenceLocation: "delegateLeftClickEventHandling(initializationProperties)"
      });

      return;

    }


    for (
      let parentElement: HTMLElement | null = leftClickEvent.target;
      isNotNull(parentElement) && parentElement !== leftClickEvent.currentTarget;
      parentElement = parentElement.parentElement
    ) {

      for (const [ selector, leftClickEventHandler ] of Object.entries(this.externalHandlersBySelectors)) {

        if (parentElement.matches(selector)) {
          leftClickEventHandler(parentElement, leftClickEvent);
        }

      }

    }

  }

}
