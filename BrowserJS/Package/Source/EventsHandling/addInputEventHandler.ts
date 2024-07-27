import {
  Logger,
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
    { handler: (inputtedValue: string, event__notAlwaysInput: Event) => unknown; }
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

    /* [ Theory ] The `event` is not always the instance of `InputEvent`
     * https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1174 */
    targetElement.addEventListener("input", (event: Event): void => {

      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        compoundParameter.handler(event.target.value, event);
      }

    });

  }

}
