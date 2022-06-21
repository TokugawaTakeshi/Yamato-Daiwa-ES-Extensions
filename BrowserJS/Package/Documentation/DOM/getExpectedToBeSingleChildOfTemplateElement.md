# `getExpectedToBeSingleChildOfTemplateElement` - get expected to be single child of template element

Retrieves the child (of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) type or specified subtype)
of [template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) if this child is exactly one,
otherwise throws the error.

```
export default function getExpectedToBeSingleChildOfTemplateElement(
  templateElementOrItsSelector: HTMLTemplateElement | string
): Element;

export default function getExpectedToBeSingleChildOfTemplateElement<DOM_ElementSubtype extends Element>(
  namedParameters: Readonly<
    (
      { templateElement: HTMLTemplateElement; } |
      { templateElementSelector: string; }
    ) & {
      expectedChildElementSubtype: new () => DOM_ElementSubtype;
      context?: Element | Document;
    }
  >
): DOM_ElementSubtype;
```
