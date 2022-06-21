# `removeSpecificCharacterFromCertainPosition` - remove specific character from certain position

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-rscfcp-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

Remove specific character from specific position.
In could be first position, last position or position of specified number from 0 or 1, but only one character will be removed.

```
removeSpecificCharacterFromCertainPosition(
  namedParameters:
      Readonly<
        {
          targetString: string;
          targetCharacter: string;
        } &
        (
          { fromFirstPosition: true; } |
          { fromLastPosition: true; } |
          { fromPosition__numerationFrom0: number; } |
          { fromPosition__numerationFrom1: number; }
        )
      >
): string
```

## Examples
### Remove from first position

```typescript
console.log(removeSpecificCharacterFromCertainPosition({
  targetString: "acapella",
  fromFirstPosition: true,
  targetCharacter: "a"
})); // => "capella"
```


### Remove from last position

```typescript
console.log(removeSpecificCharacterFromCertainPosition({
  targetString: "cats",
  fromLastPosition: true,
  targetCharacter: "s"
})); // => "cat"
```


### Remove from position of specific number

```typescript
console.log(removeSpecificCharacterFromCertainPosition({
  targetString: "ABZCD",
  fromPosition__numerationFrom1: 3,
  targetCharacter: "Z"
})); // => "ABCD"
```

```typescript
console.log(removeSpecificCharacterFromCertainPosition({
  targetString: "ABZCD",
  fromPosition__numerationFrom0: 2,
  targetCharacter: "Z"
})); // => "ABCD"
```


### Surrogate pairs support

```typescript
console.log(removeSpecificCharacterFromCertainPosition({
  targetString: "aあ😒🙂",
  fromPosition__numerationFrom1: 3,
  targetCharacter: "😒"
})); // => "aあ🙂"
```


### Ignoring when there is no target character on specified postion

```typescript
console.log(removeSpecificCharacterFromCertainPosition({
  targetString: "cats",
  fromFirstPosition: true,
  targetCharacter: "z"
})); // => "cats"
```
