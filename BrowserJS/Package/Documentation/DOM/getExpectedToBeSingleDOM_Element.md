`getExpectedToBeSingleDOM_Element` - get expected to be single DOM element

Retrieves the element corresponding to specified selector if this element presents in single instance inside specific context, 
otherwise throws the error.

```
getExpectedToBeSingleDOM_Element(
  namedParameters: Readonly<{
    selector: string;
    context?: Element | Document;
  }>
): Element;

getExpectedToBeSingleDOM_Element<DOM_ElementSubtype extends Element>(
  namedParameters: Readonly<{
    selector: string;
    context?: Element | Document;
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
