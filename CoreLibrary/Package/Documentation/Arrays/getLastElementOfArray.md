# `getLastElementOfArray` - get last element of array

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-getLastElementOfArray-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)
[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template_(alias)-gleoa-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)


```
<ArrayElement>(targetArray: ReadonlyArray<ArrayElement>): ArrayElement | null

<ArrayElement>(
  targetArray: ReadonlyArray<ArrayElement>,
  options: Readonly<{ mustThrowErrorIfArrayIsEmpty: true; }>
): ArrayElement
```

Returns the last element of array herewith if array is empty

* **UnexpectedEventError** will be thrown in `{ mustThrowErrorIfArrayIsEmpty: true }` has been passed as second parameter
* `null` will be returned if parameter is sole


## Examples

### Non-empty array case

```typescript
console.log(getLastElementOfArray([ "alpha", "bravo", "charlie" ])); // -> "charlie" 
```

### Empty array cases
### Returning of `null`

```typescript
console.log(getLastElementOfArray([])); // -> null 
```


### Throwing of error

```typescript
console.log(getLastElementOfArray([], { mustThrowErrorIfArrayIsEmpty: true })) // Error will be thrown
```
