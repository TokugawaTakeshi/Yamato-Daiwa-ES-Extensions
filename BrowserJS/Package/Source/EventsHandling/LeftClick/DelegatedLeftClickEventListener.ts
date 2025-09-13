import {
  isNotNull,
  isUndefined,
  isNotUndefined,
  Logger,
  UnexpectedEventError,
  DOM_ElementRetrievingFailedError,
  PoliteErrorsMessagesBuilder,
  type InfoLog
} from "@yamato-daiwa/es-extensions";
import getExpectedToBeSingleDOM_Element from "../../DOM/getExpectedToBeSingleDOM_Element";
import EventPropagationTypes from "../EventPropagationTypes";


class DelegatedLeftClickEventListener {

  protected readonly delegatingContainer: Element | Document;

  /* [ Theory ] A new function reference is created after `.bind()` is called, so the reference must be single. */
  protected readonly boundInternalHandler: (event: Event) => void;
  protected readonly externalHandlersBySelectors: Readonly<DelegatedLeftClickEventListener.HandlersBySelectors>;

  protected readonly eventPropagation: EventPropagationTypes | false;
  protected readonly mustBeCalledOnce: boolean;
  protected readonly mustPreventDefaultBehaviour: boolean;

  protected readonly loggingOnClick?: InfoLog;


  /* [ Approach ]
   * Required additionally to constructor to avoid the ESLint's "no-new" error/waring when do not going to call the
   *   instance methods. */
  public static createAndAssign(
    initializationProperties: DelegatedLeftClickEventListener.InitializationProperties
  ): DelegatedLeftClickEventListener {
    return new DelegatedLeftClickEventListener(initializationProperties);
  }


  public constructor(
    initializationProperties: DelegatedLeftClickEventListener.InitializationProperties
  ) {

    const {
      handlersBySelectors,
      eventPropagation = EventPropagationTypes.bubbling,
      mustBeCalledOnce = false,
      mustPreventDefaultBehaviour = false
    }: DelegatedLeftClickEventListener.InitializationProperties = initializationProperties;

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

          Logger.throwErrorWithFormattedMessage({
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
        contextElement
      });

    }

    this.delegatingContainer = delegatingContainer;

    this.boundInternalHandler = this.onLeftClick.bind(this);
    this.externalHandlersBySelectors = handlersBySelectors;

    this.eventPropagation = eventPropagation;
    this.mustBeCalledOnce = mustBeCalledOnce;
    this.mustPreventDefaultBehaviour = mustPreventDefaultBehaviour;

    this.loggingOnClick = initializationProperties.loggingOnClick;

    delegatingContainer.addEventListener(
      "click",
      this.boundInternalHandler,
      {
        capture: this.eventPropagation === EventPropagationTypes.capturing,
        once: this.mustBeCalledOnce
      }
    );

  }


  public utilize(): void {

    this.delegatingContainer.removeEventListener(
      "click",
      this.boundInternalHandler,
      { capture: this.eventPropagation === EventPropagationTypes.capturing }
    );

  }


  protected onLeftClick(leftClickEvent: Event): void {

    if (this.mustPreventDefaultBehaviour) {
      leftClickEvent.preventDefault();
    }

    if (this.eventPropagation === false) {
      leftClickEvent.stopPropagation();
    }

    if (!(leftClickEvent instanceof MouseEvent)) {

      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: PoliteErrorsMessagesBuilder.buildMessage({
          technicalDetails:
              "The subtype of \"event\" variable of addEventListener(\"click\" is not the instance of \"MouseEvent\".",
          politeExplanation:
              "Using native addEventListener(\"click\") we did expected that the subtype of \"event\", " +
                "the first parameter of the callback, will be the instance of \"MouseEvent\". " +
              "The TypeScript types definitions does not provide the overload for each type of event, so the \"event\" " +
                "has been annotated just as \"Event\". " +
              "It must be the the instance of \"MouseEvent\" subtype, however, as this occurrence shows, under certain " +
                "combination of circumstances it is not such as."
        }),
        occurrenceLocation: "delegatedLeftClickEventListener.onLeftClick(leftClickEvent)"
      });

      return;

    }


    /* [ Theory ] The "event.target" has type "EventTarget" while ".parentElement" property has type "HTMLElement"  */
    if (!(leftClickEvent.target instanceof Element)) {

      Logger.logError({
        errorType: UnexpectedEventError.NAME,
        title: UnexpectedEventError.localization.defaultTitle,
        description: PoliteErrorsMessagesBuilder.buildMessage({
          technicalDetails: "The \"event.target\" is not the instance of \"Element\".",
          politeExplanation:
              "To reach the container to which the click event has been delegated by valid TypeScript, " +
                "we had to check is \"event.target\" the instance of \"Element\". " +
              "Theoretically, the \"event.target\" has type \"EventTarget\" while \".parentElement\" property has type " +
                "\"Element\", however this bug " +
              "occurrence indicates the presence of exceptions which we need to investigate."
        }),
        occurrenceLocation: "delegatedLeftClickEventListener.onLeftClick(leftClickEvent)",
        additionalData: { eventTarget: leftClickEvent.target }
      });

      return;

    }


    if (isNotUndefined(this.loggingOnClick)) {
      Logger.logInfo(this.loggingOnClick);
    }


    for (
      let parentElement: Element | null = leftClickEvent.target;
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


namespace DelegatedLeftClickEventListener {

  export type InitializationProperties = Readonly<{
    delegatingContainer: Element | Document | Readonly<{ selector: string; }>;
    contextElement?: ParentNode | Readonly<{ selector: string; }>;
    handlersBySelectors: Readonly<HandlersBySelectors>;
    eventPropagation?: EventPropagationTypes | false;
    mustBeCalledOnce?: boolean;
    mustPreventDefaultBehaviour?: boolean;
    loggingOnClick?: InfoLog;
  }>;

  export type HandlersBySelectors = {
    [selector: string]: (clickedElement: Element, event: MouseEvent) => unknown;
  };

}


export default DelegatedLeftClickEventListener;
