/** @deprecated Use LeftClickOutOfElementEventListener instead. */
export default function addOnLeftClickOutOfElementEventHandler(
  compoundParameter: Readonly<
    {
      targetElement: Element;
      eventListeningParent?: ParentNode | Window;
      handler: (leftClickEvent: MouseEvent) => unknown;
      mustInvokeBeforeChildren_sHandlers?: boolean;
    }
  >
): void {

  const targetElement: Element = compoundParameter.targetElement;
  const eventListeningParent: ParentNode | Window = compoundParameter.eventListeningParent ?? window;

  eventListeningParent.addEventListener(
    "click",
    (event: Event): void => {

      if (!(event instanceof MouseEvent)) {
        return;
      }


      if (!(event.target instanceof Element)) {
        return;
      }


      if (!targetElement.contains(event.target)) {
        compoundParameter.handler(event);
      }

    },
    compoundParameter.mustInvokeBeforeChildren_sHandlers ?? false
  );

}
