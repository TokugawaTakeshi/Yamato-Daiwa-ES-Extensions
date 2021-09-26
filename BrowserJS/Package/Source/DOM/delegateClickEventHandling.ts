import { isNotNull } from "@yamato-daiwa/es-extensions";


export default function delegateClickEventHandling(
  {
    clickTargetSelector,
    container = document
  }: {
    clickTargetSelector: string;
    container: HTMLElement | Document;
  },
  handler: (event: MouseEvent) => void
): void {

  container.addEventListener("click", (event: Event): void => {

    if (!(event instanceof MouseEvent)) {
      return;
    }

    for (
        let targetParentNode: Element | null = event.target as Element;
        isNotNull(targetParentNode) && targetParentNode !== event.currentTarget;
        targetParentNode = targetParentNode.parentNode as Element
    ) {

      if (targetParentNode.matches(clickTargetSelector)) {
        handler(event);
      }
    }
  }, false);
}
