# `removeNthSymbol`: Removing the specified symbol from the string

```
removeNthSymbol(
  targetString: string, options: { targetSymbolNumber: number; numerationFrom: 0 | 1; }
): string
```

Removes the `options.targetSymbolNumber`th symbol from `targetString`.

* Supports [surrogate pairs](https://stackoverflow.com/q/31986614/4818123) while `split`, `slice`, `substr`, `substring`
  native `String.prototype` methods are not.
* Numeration from `0` and `1` available `options.numerationFrom`.

```typescript
console.log(removeNthSymbol("abcde", {
  numerationFrom: 0,
  targetSymbolNumber: 1
})); // => "acde"

console.log(removeNthSymbol("abcde", {
  numerationFrom: 1,
  targetSymbolNumber: 1
})); // => "bcde"

/* Surrogate pairs support */
console.log(removeNthSymbol("aあ😒🙂", {
  numerationFrom: 1,
  targetSymbolNumber: 3
}), "aあ🙂"); // => "aあ🙂"

// Vs. native 'substring':
console.log("aあ😒🙂".substring(3)); // => �🙂
```
