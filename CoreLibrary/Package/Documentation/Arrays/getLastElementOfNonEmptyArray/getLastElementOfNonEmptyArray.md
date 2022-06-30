# `getLastElementOfNonEmptyArray`: Get last element of the non-empty array

The alternative for `targetArray[targetArray.length - 1]`, herewith if array is empty, **UnexpectedEventError** error
will be thrown.

```typescript
const sampleArray: Array<string> = [ "alpha", "bravo", "charlie" ];
const lastElement: string = getLastElementOfNonEmptyArray(sampleArray); 
console.log(lastElement); // => "charlie" 


getLastElementOfNonEmptyArray([]) // 'UnexpectedEventError' will be thrown
```
