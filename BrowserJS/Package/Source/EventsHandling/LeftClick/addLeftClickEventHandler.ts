import {
  Logger,
  PoliteErrorsMessagesBuilder,
  DOM_ElementRetrievingFailedError,
  UnexpectedEventError,
  isUndefined
} from "@yamato-daiwa/es-extensions";
import getExpectedToBeSingleDOM_Element from "../../DOM/getExpectedToBeSingleDOM_Element";


export default function addLeftClickEventHandler(
  compoundParameter: Readonly<
    (
      { targetElement: Element; } |
      (
        {
          targetElement: Readonly<
            { selector: string; } &
            (
              { mustApplyToAllMatchingsWithSelector: true; } |
              { mustIgnoreSubsequentMatchingsWithSelector: true; } |
              { mustExpectExactlyOneMatchingWithSelector: true; }
            )
          >;
        } &
        { contextElement?: ParentNode | Readonly<{ selector: string; }>; }
      )
    ) &
    {
      handler: (leftClickEvent: MouseEvent) => unknown;
      mustInvokeBeforeChildren_sHandlers?: boolean;
      mustStopEventPropagation?: boolean;
    }
  >
): void {

  let targetElements: ReadonlyArray<Element>;

  if (compoundParameter.targetElement instanceof Element) {

    targetElements = [ compoundParameter.targetElement ];

  } else {

    let matchesWithTargetSelector: NodeListOf<Element> | ReadonlyArray<Element>;
    let contextElement: ParentNode | Readonly<{ selector: string; }> | undefined;

    /* [ Theory ] From the viewpoint of JavaScript, this part is redundant, but TypeScript does not see from the type definitions
    *     that if `targetElement` is not the instance of `Element`, the `contextElement` property could exist. */
    if ("contextElement" in compoundParameter) {
      contextElement = compoundParameter.contextElement;
    }


    if (isUndefined(contextElement)) {

      matchesWithTargetSelector = document.querySelectorAll(compoundParameter.targetElement.selector);

    } else if ("selector" in contextElement) {

      matchesWithTargetSelector = [ getExpectedToBeSingleDOM_Element({ selector: contextElement.selector }) ];

    } else {

      matchesWithTargetSelector = contextElement.querySelectorAll(compoundParameter.targetElement.selector);

    }

    if (matchesWithTargetSelector.length === 0) {

      Logger.logError({
        errorType: DOM_ElementRetrievingFailedError.NAME,
        title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
        description: DOM_ElementRetrievingFailedError.localization.generateDescription({
          selector: compoundParameter.targetElement.selector
        }),
        occurrenceLocation: "addLeftClickEventHandler(compoundParameter)"
      });

      return;

    } else if (matchesWithTargetSelector.length === 1) {

      targetElements = [ matchesWithTargetSelector[0] ];

    } else if ("mustApplyToAllMatchingsWithSelector" in compoundParameter) {

      targetElements = Array.from(matchesWithTargetSelector);

    } else {

      if ("mustExpectExactlyOneMatchingWithSelector" in compoundParameter) {

        Logger.logError({
          errorType: UnexpectedEventError.NAME,
          title: UnexpectedEventError.localization.defaultTitle,
          description: `Contrary to expectations, ${ matchesWithTargetSelector.length } matchings has been found for ` +
              `the selector "${ compoundParameter.targetElement.selector }". The subsequent matchings will be ignored.`,
          occurrenceLocation: "addLeftClickEventHandler(compoundParameter)"
        });

      }

      targetElements = [ matchesWithTargetSelector[0] ];

    }

  }


  for (const targetElement of targetElements) {

    targetElement.addEventListener("click", (event: Event): void => {

      if (!(event instanceof MouseEvent)) {

        Logger.logError({
          errorType: UnexpectedEventError.NAME,
          title: UnexpectedEventError.localization.defaultTitle,
          description: PoliteErrorsMessagesBuilder.buildMessage({
            technicalDetails:
                "The subtype of \"event\" variable of addEventListener(\"click\" is not the instance of \"MouseEvent\"",
            politeExplanation:
                "Using native addEventListener(\"click\") we did expected that the subtype of \"event\", " +
                  "the first parameter of the callback, will be the instance of \"MouseEvent\". " +
                "The TypeScript types definitions does not provide the overload for each type of event, so the \"event\" " +
                  "has been annotated just as \"Event\". " +
                "It must be the the instance of \"MouseEvent\" subtype, however, as this occurrence shows, under certain " +
                  "combination of circumstances it is not such as."
          }),
          occurrenceLocation: "addLeftClickEventHandler(compoundParameter)"
        });

        return;

      }

      if (compoundParameter.mustStopEventPropagation === true) {
        event.stopPropagation();
      }


      compoundParameter.handler(event);

    /* [ Reference ] https://stackoverflow.com/q/7398290/4818123 */
    }, compoundParameter.mustInvokeBeforeChildren_sHandlers ?? false);

  }

}
