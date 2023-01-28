import {
  Logger,
  PoliteErrorsMessagesBuilder,
  DOM_ElementRetrievingFailedError,
  UnexpectedEventError
} from "@yamato-daiwa/es-extensions";


export default function addLeftClickEventHandler(
  namedParameters: Readonly<
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
        handler: (...parameters: ReadonlyArray<unknown>) => unknown;
        mustHandleParentElementFirst?: boolean;
      }
    >
): void {

  let targetElements: ReadonlyArray<Element>;

  if ("targetElement" in namedParameters) {

    targetElements = [ namedParameters.targetElement ];

  } else {

    const matchesWithTargetSelector: NodeListOf<Element> = document.querySelectorAll(namedParameters.targetElementSelector);

    if (matchesWithTargetSelector.length === 0) {

      Logger.throwErrorAndLog({
        errorInstance: new DOM_ElementRetrievingFailedError({ selector: namedParameters.targetElementSelector }),
        title: DOM_ElementRetrievingFailedError.localization.defaultTitle,
        occurrenceLocation: "addLeftClickEventHandler(namedParameters)"
      });

    } else if (matchesWithTargetSelector.length === 1) {

      targetElements = [ matchesWithTargetSelector[0] ];

    } else if ("mustApplyToAllMatchingsWithSelector" in namedParameters) {

      targetElements = Array.from(matchesWithTargetSelector);

    } else {

      if ("mustExpectExactlyOneMatchingWithSelector" in namedParameters) {

        Logger.logError({
          errorType: UnexpectedEventError.NAME,
          title: UnexpectedEventError.localization.defaultTitle,
          description: `Contrary to expectations, ${ matchesWithTargetSelector.length } matches has been found for ` +
              `the selector "${ namedParameters.targetElementSelector }". The subsequent matches will be ignored.`,
          occurrenceLocation: "addLeftClickEventHandler(namedParameters)"
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
            technicalDetails: "The subtype of \"event\" variable of `addEventListener(\"click\"` is not the instance of." +
                "\"MouseEvent\"",
            politeExplanation: "Using native `addEventListener(\"click\"` we did expected that the subtype of \"event\", " +
                "the first parameter of the callback, will be the instance of \"MouseEvent\". The TypeScript types definitions " +
                "does not provide the overload for each type of event, so the \"event\" has been annotated just as \"Event\". " +
                "It must be the the instance of \"MouseEvent\" subtype, however under certain combination of circumstances " +
                "it is not such as."
          }),
          occurrenceLocation: "addLeftClickEventHandler(namedParameters)"
        });

        return;

      }


      namedParameters.handler();

    /* [ Reference ] https://stackoverflow.com/q/7398290/4818123 */
    }, namedParameters.mustHandleParentElementFirst ?? false);

  }

}
