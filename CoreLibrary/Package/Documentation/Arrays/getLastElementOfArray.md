# `getLastElementOfArray` - get last element of empty array

```
<ArrayElement>(targetArray: ReadonlyArray<ArrayElement>): ArrayElement | null

getLastElementOfArray<ArrayElement>(
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
