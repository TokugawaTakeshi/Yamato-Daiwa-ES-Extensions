## `isStringifiedNonNegativeIntegerOfRegularNotation`: Is stringified non-negative integer of regular notation check

```
isStringifiedNonNegativeIntegerOfRegularNotation(value: string): boolean
```

The "regular notation" is unofficial name of antonym of [Scientific notation](https://en.wikipedia.org/wiki/Scientific_notation)
AKA **exponential notation**.
It means that `isStringifiedNonNegativeIntegerOfRegularNotation` returns `true` for `"30"` but `false` for `"3e+1"`
although `"3e+1"` is `30` in exponential notation.

```typescript
console.log(isStringifiedNonNegativeIntegerOfRegularNotation("30")) // true
console.log(isStringifiedNonNegativeIntegerOfRegularNotation("3e+1")) // false
```
