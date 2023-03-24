# `getExpectedToBeSingleChildOfTemplateElement` - get expected to be single child of template element

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-getExpectedToBeSingleChildOfTemplateElement-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

Retrieves the child (of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) type or specified subtype)
of [template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) if this child is exactly one,
otherwise throws the error.

```
(
  compoundParameter: Readonly<
    (
      {
        templateElement: HTMLTemplateElement;
      } |
      {
        templateElementSelector: string;
        context?: Element | Document;
      }
    ) &
    {
      expectedChildElementSubtype: new () => DOM_ElementSubtype;
      mustReplaceTemplateElementOnceDoneWith?: Node;
      mustRemoveTemplateElementOnceDone?: true;
    }
  >
): Element;
 
<DOM_ElementSubtype extends Element>(
  compoundParameter: Readonly<
    (
      {
        templateElement: HTMLTemplateElement;
      } |
      {
        templateElementSelector: string;
        context?: Element | Document;
      }
    ) &
    {
      mustReplaceTemplateElementOnceDoneWith?: Node;
      mustRemoveTemplateElementOnceDone?: true;
    }
  >
): DOM_ElementSubtype;
```


## Errors

## Examples

### Simplest usage

```html
<div class="PageContent">
  <template id="CardTemplate">
    <div class="Card"></div>
  </template>
</div>
```

In the simplest case, it's possible to specify the target `<template>` element by selector.
The function `getExpectedToBeSingleChildOfTemplateElement` will automatically unwrap this element:

```typescript
console.log(
  getExpectedToBeSingleChildOfTemplateElement({
    templateElementSelector: "#CardTemplate"
  }).className
); // -> "Card"
```

If you already have picked the `<template>` template, you can specify it via `templateElement` property:

```typescript
const templateElement: HTMLTemplateElement = getExpectedToBeSingleDOM_Element({
  selector: "#CardTemplate",
  expectedDOM_ElementSubtype: HTMLTemplateElement
});

console.log(getExpectedToBeSingleChildOfTemplateElement({ templateElement }).className); // -> "Card"
```

You must be sure that `<template>` element has exactly one child because `getExpectedToBeSingleChildOfTemplateElement`
  has been designed for such cases.
If you are not sure, you need to pick the `<template>` element by the appropriate function 
  (for example, the `getExpectedToBeSingleDOM_Element`) and then access to 
  [`children`](https://developer.mozilla.org/en-US/docs/Web/API/Element/children) collection.


### Checking for the subtype

In above examples, the instance of [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) has been 
  returned.
If you need some subtype of **Element**, specify the `expectedChildElementSubtype` property:

```typescript
const emptyCard: HTMLDivElement = getExpectedToBeSingleChildOfTemplateElement({
  templateElementSelector: "#CardTemplate",
  expectedChildElementSubtype: HTMLDivElement
});
```

If actual subtype child of template element does not match with specified `expectedChildElementSubtype`, the
  `InvalidParameterValueError` will be thrown.


### The cleaning up

If you don't need the `<template>` element anymore, you can optionally remove it or replace it with another 
  [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) with options of 
  `getExpectedToBeSingleChildOfTemplateElement`: 

```typescript
const emptyCard: HTMLDivElement = getExpectedToBeSingleChildOfTemplateElement({
  templateElementSelector: "#CardTemplate",
  expectedChildElementSubtype: HTMLDivElement,
  mustRemoveTemplateElementOnceDone: true
});
```
