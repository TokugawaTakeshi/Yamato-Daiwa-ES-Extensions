# `cloneDOM_Element` - clone DOM element

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-cloneDOM_Element-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)


```
<DOM_ElementSubtype extends Element = Element>(
  compoundParameter: Readonly<{
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
