# `delegateClickEventHandling`

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

## Usage


## Errors

### Thrown

### Not thrown


## Comparison with native implementation


## Comparison with jQuery
