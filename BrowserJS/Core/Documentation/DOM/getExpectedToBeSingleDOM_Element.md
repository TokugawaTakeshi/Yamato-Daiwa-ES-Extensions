# `getExpectedToBeSingleDOM_Element` - get expected to be single DOM element

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-getExpectedToBeSingleDOM__Element-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

Retrieves the element corresponding to specified selector if this element presents in single instance inside specific context.

```
export default function getExpectedToBeSingleDOM_Element(
  compoundParameter: Readonly<{
    selector: string;
    contextElement?: ParentNode | Readonly<{ selector: string; }>;
  }>
): Element;

export default function getExpectedToBeSingleDOM_Element<DOM_ElementSubtype extends Element>(
  compoundParameter: Readonly<{
    selector: string;
    contextElement?: ParentNode | Readonly<{ selector: string; }>;
    expectedDOM_ElementSubtype: new () => DOM_ElementSubtype;
  }>
): DOM_ElementSubtype;
```


## Errors
### Thrown
#### DOM_ElementRetrievingFailedError

Will be thrown in no element corresponding to specified **selector** has been found.


#### UnexpectedEventError

Will be thrown if picked element does not match with specified **expectedDOM_ElementSubtype**.


### Logging only

#### UnexpectedEventError

Will be logged of contrary to expectations more than one element corresponding to specified selector.


## Examples 

```html
<div class="ActionBar">
  <button type="button" class="Button"></button>
</div>
```

Without specified **expectedDOM_ElementSubtype**, the instance of **Element** will be returned.

```typescript
const targetButton: Element = getExpectedToBeSingleDOM_Element({ selector: ".Button" });
```

If specify **expectedDOM_ElementSubtype**, we can retrieve of **HTMLButtonElement**:

```typescript
const targetButton: HTMLButtonElement = getExpectedToBeSingleDOM_Element({
  selector: ".Button",
  expectedDOM_ElementSubtype: HTMLButtonElement
})
```
