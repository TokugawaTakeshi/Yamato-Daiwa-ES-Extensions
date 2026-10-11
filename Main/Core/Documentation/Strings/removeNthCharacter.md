# `removeNthCharacter`: Removing the specified symbol from the string

```
removeNthCharacter(
  targetString: string, options: { targetCharacterNumber: number; numerationFrom: 0 | 1; }
): string
```

Removes the `options.targetCharacterNumber`th symbol from `targetString`.

* Supports [surrogate pairs](https://stackoverflow.com/q/31986614/4818123) while `split`, `slice`, `substr`, `substring`
  native `String.prototype` methods are not.
* Numeration from `0` and `1` available `options.numerationFrom`.

```typescript
console.log(removeNthCharacter("abcde", {
  numerationFrom: 0,
  targetCharacterNumber: 1
})); // => "acde"

console.log(removeNthCharacter("abcde", {
  numerationFrom: 1,
  targetCharacterNumber: 1
})); // => "bcde"

/* Surrogate pairs support */
console.log(removeNthCharacter("aあ😒🙂", {
  numerationFrom: 1,
  targetCharacterNumber: 3
}), "aあ🙂"); // => "aあ🙂"

// Vs. native 'substring':
console.log("aあ😒🙂".substring(3)); // => �🙂
```
