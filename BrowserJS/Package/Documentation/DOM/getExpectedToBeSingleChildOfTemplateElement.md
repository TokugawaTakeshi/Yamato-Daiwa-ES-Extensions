# `getExpectedToBeSingleChildOfTemplateElement` - get expected to be single child of template element

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-getExpectedToBeSingleChildOfTemplateElement-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

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
