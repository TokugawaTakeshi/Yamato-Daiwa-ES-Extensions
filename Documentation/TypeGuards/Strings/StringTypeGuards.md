# String Type Guards

If you need to check just is value a string or not and nothing more, use `isString(targetValue)`.
Below functions besides make TypeScript believe that the value is a string (when value is actually a string) executes some
additional checks and returns `false` when some check has not been passed:

* `isEmptyString(potentialString: unknown): potentialString is string`
* `isNonEmptyString(potentialString: unknown): potentialString is string`
* `isStringOfLength(potentialString: unknown): potentialString is string`

```typescript
isStringOfLength("abcde", { exactSymbolsCount: 5 }); // true
isStringOfLength("abcd", { exactSymbolsCount: 5 }); // false

isStringOfLength("abcde", { minimalSymbolsCount: 5 }); // true
isStringOfLength("abcd", { minimalSymbolsCount: 5 }); // false

isStringOfLength("abcde", { maximalSymbolsCount: 5 }); // true
isStringOfLength("abcdef", { maximalSymbolsCount: 5 }); // false

isStringOfLength("ab", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // true
isStringOfLength("abc", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // true
isStringOfLength("abcde", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // true
isStringOfLength("abcdef", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // false
isStringOfLength("a", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // false
```
