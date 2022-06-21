# `hasStringOnlySpecificCharacters` - has string once specified characters check

Check does string including specified characters only without regular expression.
You can pass the allowed characters as array, string, or object with special shorthand options.

```
hasStringOnlySpecificCharacters(
  targetString: string,
  characters: Array<string> | string | Readonly<{
    latinUppercase?: boolean;
    latinLowercase?: boolean;
    digits?: boolean;
    other?: Array<string> | string;
  }>
): boolean
```

## Examples

```typescript
console.log(hasStringOnlySpecificCharacters("1234567890", { digits: true })); // => true
console.log(hasStringOnlySpecificCharacters("1234567890.", { digits: true, other: "." })); // => true
console.log(hasStringOnlySpecificCharacters("1234567890ABC", { digits: true, latinUppercase: true })); // => true
```
