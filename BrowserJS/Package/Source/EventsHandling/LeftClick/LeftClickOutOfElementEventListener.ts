import EventPropagationTypes from "./EventPropagationTypes";


class LeftClickOutOfElementEventListener {

  private readonly elementOutOfWhich: Element;
  private readonly eventListeningParent: ParentNode | Window;

  private readonly payloadHandler: (leftClickEvent: MouseEvent) => void;
  private readonly boundHandler: (event: Event) => void;

  private readonly eventPropagation: EventPropagationTypes | false;
  private readonly mustBeCalledOnce: boolean;


  public static createAndAssign(
    initializationProperties: LeftClickOutOfElementEventListener.InitializationProperties
  ): LeftClickOutOfElementEventListener {
    return new LeftClickOutOfElementEventListener(initializationProperties);
  }


  private constructor(
    {
      elementOutOfWhich,
      eventListeningParent = window,
      callback,
      eventPropagation = EventPropagationTypes.bubbling,
      mustBeCalledOnce = false
    }: LeftClickOutOfElementEventListener.InitializationProperties
  ) {

    this.elementOutOfWhich = elementOutOfWhich;
    this.eventListeningParent = eventListeningParent;

    this.payloadHandler = callback;
    this.boundHandler = this.handler.bind(this);

    this.eventPropagation = eventPropagation;
    this.mustBeCalledOnce = mustBeCalledOnce;

    this.eventListeningParent.addEventListener(
      "click",
      this.boundHandler,
      {
        capture: this.eventPropagation === EventPropagationTypes.capturing,
        once: this.mustBeCalledOnce
      }
    );

  }

  public utilize(): void {
    this.eventListeningParent.removeEventListener(
      "click",
      this.boundHandler,
      { capture: this.eventPropagation === EventPropagationTypes.capturing }
    );
  }


  private handler(event: Event): void {

    if (this.eventPropagation === false) {
      event.stopPropagation();
    }


    if (!(event instanceof MouseEvent)) {
      return;
    }


    if (!(event.target instanceof Element)) {
      return;
    }


    if (!this.elementOutOfWhich.contains(event.target)) {
      this.payloadHandler(event);
    }

  }

}


namespace LeftClickOutOfElementEventListener {

  export type InitializationProperties = Readonly<{
    elementOutOfWhich: Element;
    eventListeningParent?: ParentNode | Window;
    callback: (leftClickEvent: MouseEvent) => void;
    eventPropagation?: EventPropagationTypes | false;
    mustBeCalledOnce?: boolean;
  }>;

}


export default LeftClickOutOfElementEventListener;
