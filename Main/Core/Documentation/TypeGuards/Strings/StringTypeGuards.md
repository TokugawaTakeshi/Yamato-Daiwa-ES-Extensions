# String Type Guards

If you need to check just is value a string or not and nothing more, use `isString(targetValue)`.
Below functions besides make TypeScript believe that the value is a string (when value is actually a string) executes some
additional checks and returns `false` when some check has not been passed:

* `isEmptyString(potentialString: unknown): potentialString is string`
* `isNonEmptyString(potentialString: unknown): potentialString is string`
* `isStringOfLength(potentialString: unknown): potentialString is string`

```typescript
isStringOfLength("abcde", { exactCharactersCount: 5 }); // true
isStringOfLength("abcd", { exactCharactersCount: 5 }); // false

isStringOfLength("abcde", { minimalCharactersCount: 5 }); // true
isStringOfLength("abcd", { minimalCharactersCount: 5 }); // false

isStringOfLength("abcde", { maximalCharactersCount: 5 }); // true
isStringOfLength("abcdef", { maximalCharactersCount: 5 }); // false

isStringOfLength("ab", { minimalCharactersCount: 2, maximalCharactersCount: 5 }); // true
isStringOfLength("abc", { minimalCharactersCount: 2, maximalCharactersCount: 5 }); // true
isStringOfLength("abcde", { minimalCharactersCount: 2, maximalCharactersCount: 5 }); // true
isStringOfLength("abcdef", { minimalCharactersCount: 2, maximalCharactersCount: 5 }); // false
isStringOfLength("a", { minimalCharactersCount: 2, maximalCharactersCount: 5 }); // false
```
