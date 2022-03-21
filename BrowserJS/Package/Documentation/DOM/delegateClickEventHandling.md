# delegateClickEventHandling

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-dceh-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

```
delegateClickEventHandling(
  compoundParameter: {
    eventTargetSelector: string;
    delegatingContainerOrIt_sSelector: Element | Document | string;
    handler: (clickedElement: Element, event: MouseEvent) => unknown;
  }
): void;

delegateClickEventHandling<ClickTargetElement extends Element>(
  compoundParameter: {
    eventTargetSelector: string;
    delegatingContainerOrIt_sSelector: Element | Document | string;
    eventTargetElementSubtype: new () => ClickTargetElement;
    handler: (clickedElement: ClickTargetElement, event: MouseEvent) => unknown;
  }
): void;
```

Provides the delegating of click event functionality, the optimization measure 
(see more [event delegation pattern](https://javascript.info/event-delegation)). 


## Usage

Below code adds the single click event listener to ".List" element herewith the **handler** will fire when any element
with ".Button" class inside ".List" will be clicked:

```typescript
delegateClickEventHandling({
  eventTargetSelector: ".Button",
  delegatingContainerOrIt_sSelector: ".List",
  handler: (clickedElement: Element, event: MouseEvent): void => {
    console.log("clicked")
  } 
})
```

The first parameter in the instance of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) class. 
If you need the specific inheritor of **Element** class (for example, **HTMLButtonElement**), 
specify it via **eventTargetElementSubtype** parameter:

```typescript
delegateClickEventHandling<HTMLButtonElement>({
  eventTargetSelector: ".Button",
  delegatingContainerOrIt_sSelector: ".List",
  eventTargetElementSubtype: HTMLButtonElement,
  handler: (clickedElement: HTMLButtonElement, event: MouseEvent): void => {
    clickedElement.blur(); // Now you can use the methods of HTMLButtonElement instance
  }
});
```


## Errors

### Thrown
#### DOM_ElementRetrievingFailedError

Will be thrown if there are no element corresponding to selector specified in **delegatingContainerOrIt_sSelector**
property of compound parameter.


### Logging only
#### UnexpectedEventError

Will be logged if element corresponding to **eventTargetSelector** is not instance of specified in
**eventTargetElementSubtype** class. The handler will not be executed for preventing of other errors.

Also, with an extremely low probability, it could be the casting 
(of [**Event** interface](https://developer.mozilla.org/en-US/docs/Web/API/Event)
to [**MouseEvent**](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)) error - if it will happen,
it is required to investigate it so please consider the opening the issue with reproducing example.


## Comparison with native implementation

There is no short native solution.
Here is the solution from [youmightnotneedjquery.com](https://youmightnotneedjquery.com/#delegate):

```javascript
document.addEventListener(eventName, function(e) {
  // loop parent nodes from the target to the delegation node
  for (var target = e.target; target && target != this; target = target.parentNode) {
    if (target.matches(elementSelector)) {
      handler.call(target, e);
        break;
    }
  }
}, false);
```

The **yamato-daiwa/es-extensions** implementation is improved above one.
