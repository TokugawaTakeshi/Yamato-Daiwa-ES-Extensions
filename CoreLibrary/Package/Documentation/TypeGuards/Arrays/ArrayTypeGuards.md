# Array Type Guards

If you need to check just is value an array or not and nothing more, use native `Array.isArray(targetValue)`.
Below functions besides make TypeScript believe that the value is an array (when value is actually an array) executes
some additional checks and returns `false` when some check has not been passed:

* `isEmptyArray(potentialArray: unknown): potentialArray is Array<unknown>`
* `isNonEmptyArray(potentialArray: unknown): potentialArray is Array<unknown>`

```
isArrayOfCertainTypeElements<ArrayElementType>(
  potentialArray: unknown, elementTypeGuard: (element: unknown) => element is ArrayElementType
): potentialArray is Array<ArrayElementType>
```

```typescript
isArrayOfLength("abcde".split(""), { exactElementsCount: 5 }); // true
isArrayOfLength("abcd".split(""), { exactElementsCount: 5 }); // false

isArrayOfLength("abcde".split(""), { minimalElementsCount: 5 }); // true
isArrayOfLength("abcd".split(""), { minimalElementsCount: 5 }); // false

isArrayOfLength("abcde".split(""), { maximalElementsCount: 5 }); // true
isArrayOfLength("abcdef".split(""), { maximalElementsCount: 5 }); // false

isArrayOfLength("ab".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // true
isArrayOfLength("abc".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // true
isArrayOfLength("abcde".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // true
isArrayOfLength("abcdef".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // false
isArrayOfLength("a".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // false
```
