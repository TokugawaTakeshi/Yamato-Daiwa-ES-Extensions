# `cloneDOM_Element` - clone DOM element

```
<DOM_ElementSubtype extends Element = Element>(
  compoundObject: Readonly<{
    targetElement: DOM_ElementSubtype;
    mustCopyAllChildren: boolean;
  }>
):DOM_ElementSubtype
```

Clones DOM element herewith tells TypeScript that cloned element has same subtype of the 
  [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) as initial instance
  (it is natural, however the TypeScript typing for the [`Node.cloneNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)
  has [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) as returned value type; it is the 
  [TypeScript issue](https://github.com/microsoft/TypeScript/issues/283)).

```typescript
const emptyTab: HTMLElement = getExpectedToBeSingleDOM_Element({
  selector: "#EMPTY_TAB",
  expectedDOM_ElementSubtype: HTMLElement
});

const clonedTab: HTMLElement = cloneDOM_Element({ 
  targetElement: emptyTab, mustCopyAllChildren: false 
});
```
