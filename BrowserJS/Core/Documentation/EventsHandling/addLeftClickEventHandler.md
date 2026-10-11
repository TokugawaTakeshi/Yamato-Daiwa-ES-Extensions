# `addLeftClickEventHandler` - Add left click event handler

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-addLeftClickEventHandler-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)
[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template_(alias)-alceh-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

```
(
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
      handler: (leftClickEvent: MouseEvent) => unknown;
      mustInvokeBeforeChildren_sHandlers?: boolean;
    }
  >
): void
```

Adds on mouse left click event handler.
The main difference with native analogues is `addLeftClickEventHandler` provides the instance of 
  [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent), not 
  [generic `Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) that is critical for TypeScript.


## Compound parameter
### `targetElement`

<dl>
  <dt>Type</dt>
  <dd><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element">Element</a></dd>
  <dt>Required if</dt>
  <dd>The DOM element already has been picked</dd>
</dl>

You can pass **Element** or any its inheritor if it has been picked preliminarily.

```typescript
addLeftClickEventHandler({
  targetElement: formSubmittingButton,
  handler: (): void => { console.log("Form submitting button clicked"); }
})
```


### `targetElementSelector` and related

<dl>
  <dt>Type</dt>
  <dd>String</dd>
  <dt>Required if</dt>
  <dd>Not DOM element has been picked preliminarily</dd>
  <dt>Note</dt>
  <dd>Must be valid CSS selector</dd>
</dl>

You can specify the element of target CSS selector, but in this case you must be clearly aware of how much matchings with
  selector you are expecting.

* If you want to apply the handler to multiple matching elements, specify `mustApplyToAllMatchingsWithSelector` option with `true`.
* If you want to apply the handler to only first matching elements even matchings are multiple, specify 
  `mustIgnoreSubsequentMatchingsWithSelector` option with `true`.
* If you are expecting the exactly one matching with selector and considering the subsequent matching as anomaly,
  specify `mustExpectExactlyOneMatchingWithSelector` option with `true`. 
  If it will be multiple matchings contrary to to expectations, the error will not be thrown but you will be warned
  in the console.

Note the one of above option must be specified with `true` if you want to apply the event handler by selector. 

```typescript
addLeftClickEventHandler({
  targetElementSelector: `#SUBMITTING_BUTTON`,
  mustExpectExactlyOneMatchingWithSelector: true,
  handler: (): void => { console.log("Form submitting button clicked"); }
})
```


### `handler`

The event handler which will fire once specified element has been clicked.



### `mustInvokeBeforeChildren_sHandlers`

Same that [`useCapture`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#usecapture) from
  native event listener adding methods, but with clear name.

If the target element has child herewith child has the click event handler too,
  when `mustInvokeBeforeChildren_sHandlers` is `true`, the handler of target element fires first when overlapping
  child element has been clicked.
