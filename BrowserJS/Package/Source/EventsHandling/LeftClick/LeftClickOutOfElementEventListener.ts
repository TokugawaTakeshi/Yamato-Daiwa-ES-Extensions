import EventPropagationTypes from "../EventPropagationTypes";


class LeftClickOutOfElementEventListener {

  protected readonly elementOutOfWhich: Element;
  protected readonly eventListeningParent: ParentNode | Window;

  /* [ Theory ] A new function reference is created after `.bind()` is called, so the reference must be single. */
  protected readonly boundInternalHandler: (event: Event) => void;
  protected readonly externalHandler: (leftClickEvent: MouseEvent) => void;

  protected readonly eventPropagation: EventPropagationTypes | false;
  protected readonly mustBeCalledOnce: boolean;
  protected readonly mustKeepDefaultBehaviour: boolean;


  /* [ Approach ]
   * Required additionally to constructor to avoid the ESLint's "no-new" error/waring when do not going to call the
   *   instance methods. */
  public static createAndAssign(
    initializationProperties: LeftClickOutOfElementEventListener.InitializationProperties
  ): LeftClickOutOfElementEventListener {
    return new LeftClickOutOfElementEventListener(initializationProperties);
  }


  protected constructor(
    {
      elementOutOfWhich,
      eventListeningParent = window,
      callback,
      eventPropagation = EventPropagationTypes.bubbling,
      mustBeCalledOnce = false,
      mustKeepDefaultBehaviour = false
    }: LeftClickOutOfElementEventListener.InitializationProperties
  ) {

    this.elementOutOfWhich = elementOutOfWhich;
    this.eventListeningParent = eventListeningParent;

    this.externalHandler = callback;
    this.boundInternalHandler = this.onLeftClick.bind(this);

    this.eventPropagation = eventPropagation;
    this.mustBeCalledOnce = mustBeCalledOnce;
    this.mustKeepDefaultBehaviour = mustKeepDefaultBehaviour;

    this.eventListeningParent.addEventListener(
      "click",
      this.boundInternalHandler,
      {
        capture: this.eventPropagation === EventPropagationTypes.capturing,
        once: this.mustBeCalledOnce
      }
    );

  }

  public utilize(): void {
    this.eventListeningParent.removeEventListener(
      "click",
      this.boundInternalHandler,
      { capture: this.eventPropagation === EventPropagationTypes.capturing }
    );
  }


  protected onLeftClick(leftClickEvent: Event): void {

    if (!this.mustKeepDefaultBehaviour) {
      leftClickEvent.preventDefault();
    }

    if (this.eventPropagation === false) {
      leftClickEvent.stopPropagation();
    }

    if (!(leftClickEvent instanceof MouseEvent)) {
      return;
    }


    if (!(leftClickEvent.target instanceof Element)) {
      return;
    }


    if (!this.elementOutOfWhich.contains(leftClickEvent.target)) {
      this.externalHandler(leftClickEvent);
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
    mustKeepDefaultBehaviour?: boolean;
  }>;

}


export default LeftClickOutOfElementEventListener;
