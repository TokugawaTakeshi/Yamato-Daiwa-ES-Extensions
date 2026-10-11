# Other Type Guards

* `isBoolean(potentialBooleanValue: unknown): potentialBooleanValue is boolean`
* `isFunctionLike(potentialFunction: unknown): potentialFunction is Function`

```
isElementOfEnumeration<EnumerationElement extends string | number>(
  possibleEnumerationElement: string | number, 
  targetEnumeration: { [key: string]: EnumerationElement; 
}): possibleEnumerationElement is EnumerationElement`
```
