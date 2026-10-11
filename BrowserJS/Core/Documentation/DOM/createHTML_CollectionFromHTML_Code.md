# createHTML_CollectionFromHTML_Code

```
(HTML_Code: string): HTMLCollection
```

Creates the [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) from HTML code passed
  as parameter.

```typescript
import createHTML_CollectionFromHTML_Code from "./createHTML_CollectionFromHTML_Code";

const elements: HTMLCollection = createHTML_CollectionFromHTML_Code(
  `<h1>Heading</h1><p>Paragraph</p>`
)

for (const element of elements) {
  console.log(elements);
}
```

## Comparison with native methods

The native implementation of creating of elements will take at least three lines:

```typescript
const delegatingContainer: Document = document.implementation.createHTMLDocument();

delegatingContainer.body.innerHTML = HTML_Code;

return delegatingContainer.body.children;
```

This is the implementation of [createHTML_CollectionFromHTML_Code](createHTML_CollectionFromHTML_Code.md) function.
