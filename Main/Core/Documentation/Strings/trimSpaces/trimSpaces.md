
# `trimSpaces`

```
(
  targetString: string,
  options: {
    skipLeadingOnes?: boolean;
    skipTrailingOnes?: boolean;
    targetSpacesKinds?: Array<SpaceCharacters>;
    excludeKinds?: Array<SpaceCharacters>;
  };
): string
```

Removes leading and/or (dependent on parameter) trailing space characters (all kinds by default).



## Basic usage

As below test proves, the native `String.prototype.trim` does not removing the zero-width spaces:

```typescript
import { SpaceCharacters } from "@yamato-daiwa/es-extensions";
import { strictEqual } from "assert";

it("Native 'trim' does not remove the zero-width space", (): void => {

  const testStringWithLeadingAndTrailingSpaces: string =
      `${SpaceCharacters.zeroWidthSpace}${stringSampleWithNonSpaceCharactersOnly}`;

  strictEqual(testStringWithLeadingAndTrailingSpaces.length, testStringWithLeadingAndTrailingSpaces.trim().length);
});
```

The `trimSpaces` has been checked for each type of space characters 
(stored in `SpaceCharacters` enumeration; normally these characters are indistinguishable visually):

```typescript
it("'trimSpaces' remove all leading and trailing spaces", (): void => {
  Object.entries(SpaceCharacters).forEach(([ , spaceCharacter ]: [ string, string ]): void => {

    const testStringWithLeadingAndTrailingSpaces: string =
        `${spaceCharacter}${spaceCharacter}${stringSampleWithNonSpaceCharactersOnly}${spaceCharacter}${spaceCharacter}`;

    strictEqual(trimSpaces(testStringWithLeadingAndTrailingSpaces).length, nonSpaceCharactersCountInSample);
  });
});
```

## Ignoring leading or trailing characters

* Set `skipLeadingOnes` option to `true` to ignore the leading space characters.
* Set `skipTrailingOnes` option to `true` to ignore the trailing space characters.

Of you set bot option to `true`, the error will not be thrown but returnable string with be even with first parameter.

```typescript
console.log(trimSpaces(" A ", { skipTrailingOnes: true }) === "A "); // => true
console.log(trimSpaces(" A ", { skipLeadingOnes: true }) === " A"); // => true
```


## Excluding of specific kinds of space character

* If you want to remove just about one-two kinds of space characters, specify `options.targetSpacesKinds` with array
  of desired spaces (recommended to use `SpaceCharacters` enumeration because space characters are indistinguishable visually).
* If you want to remove most of the kinds of space characters, specify `options.excludeKinds` with array of
  kinds of spaces which you want to keep.
* If you specify both of these options and same kind of space will present on both `targetSpacesKinds` and `excludeKinds`,
  these characters will **not** be removed.

In below example, the ideographic characters will be kept:

```typescript
console.log(trimSpaces(
  "　試験　",
  { excludeKinds: [ SpaceCharacters.ideographicSpace ] }
).length); // => 4
```


## Future reading

* [📖 Whitespace character - Wikipedia](https://en.wikipedia.org/wiki/Whitespace_character)
