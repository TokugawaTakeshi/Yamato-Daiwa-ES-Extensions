import {
  Logger,
  PoliteErrorsMessagesBuilder,
  DOM_ElementRetrievingFailedError,
  UnexpectedEventError
} from "@yamato-daiwa/es-extensions";


export default function addInputEventHandler(
  compoundParameter: Readonly<
    (
      { targetElement: Element; } |
      (
        { targetElementSelector: string; } &
        (
          { mustApplyToAllMatchingsWithSelector: true; } |
          { mustIgnoreSubsequentMatchingsWithSelector: true; } |
          { mustExpectExactlyOneMatchingWithSelector: true; }
        )
      )
    ) &
    {
      handler: (inputEvent: InputEvent) => unknown;
    }
  >
): void {

  let targetElements: ReadonlyArray<Element>;

  if ("targetElement" in compoundParameter) {

    targetElements = [ compoundParameter.targetElement ];

  } else {

    const matchesWithTargetSelector: NodeListOf<Element> = document.querySelectorAll(compoundParameter.targetElementSelector);

    if (matchesWithTargetSelector.length === 0) {

      Logger.logError({
        errorType: DOM_ElementRetrievingFailedError.NAME,
        title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
        description: DOM_ElementRetrievingFailedError.localization.generateDescription({
          selector: compoundParameter.targetElementSelector
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
              `the selector "${ compoundParameter.targetElementSelector }". The subsequent matchings will be ignored.`,
          occurrenceLocation: "addLeftClickEventHandler(compoundParameter)"
        });

      }

      targetElements = [ matchesWithTargetSelector[0] ];

    }

  }


  for (const targetElement of targetElements) {

    targetElement.addEventListener("input", (event: Event): void => {

      if (!(event instanceof InputEvent)) {

        Logger.logError({
          errorType: UnexpectedEventError.NAME,
          title: UnexpectedEventError.localization.defaultTitle,
          description: PoliteErrorsMessagesBuilder.buildMessage({
            technicalDetails:
                "The subtype of \"event\" variable of addEventListener(\"click\" is not the instance of \"InputEvent\"",
            politeExplanation:
                "Using native addEventListener(\"input\") we did expected that the subtype of \"event\", " +
                  "the first parameter of the callback, will be the instance of \"InputEvent\". " +
                "The TypeScript types definitions does not provide the overload for each type of event, so the \"event\" " +
                  "has been annotated just as \"Event\". " +
                "It must be the the instance of \"MouseEvent\" subtype, however, as this occurrence shows, under certain " +
                  "combination of circumstances it is not such as."
          }),
          occurrenceLocation: "addLeftClickEventHandler(compoundParameter)"
        });

        return;

      }


      compoundParameter.handler(event);

    });

  }

}
