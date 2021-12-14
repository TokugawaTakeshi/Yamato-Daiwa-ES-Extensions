import { isNotNull } from "@yamato-daiwa/es-extensions";


export default function delegateClickEventHandling<ClickTargetElement extends Element>(
  {
    clickTargetSelector,
    clickTargetTypeChecker,
    container = document
  }: {
    clickTargetSelector: string;
    clickTargetTypeChecker: (element: Element) => element is ClickTargetElement;
    container?: Element | Document;
  },
  handler: (clickedElement: ClickTargetElement, event: MouseEvent) => void
): void {

  container.addEventListener("click", (event: Event): void => {

    if (!(event instanceof MouseEvent)) {
      return;
    }


    for (
      let parentElement: Element | null = event.target as Element;
      isNotNull(parentElement) && parentElement !== event.currentTarget;
      parentElement = parentElement.parentElement
    ) {

      if (parentElement.matches(clickTargetSelector)) {

        if (!clickTargetTypeChecker(parentElement)) {
          console.error("error");
          return;
        }

        handler(parentElement, event);
      }
    }
  }, false);
}
