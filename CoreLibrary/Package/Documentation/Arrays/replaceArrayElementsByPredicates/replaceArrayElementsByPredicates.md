# `replaceArrayElementsByPredicates` - Replace array elements by predicates

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-replaceArrayElementsByPredicates-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)
[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template_(alias)-rpaebp-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

```
<ArrayElement>(sourceData: SourceData<ArrayElement>): Result<ArrayElement>
```

```typescript
export type SourceData<ArrayElement> =
    Readonly<(
      {
        mutably: true;
        targetArray: Array<ArrayElement>;
      } |
      {
        mutably: false;
        targetArray: ReadonlyArray<ArrayElement>;
      }
    )> &
    (
      Replacement<ArrayElement> |
      Readonly<{ replacements: ReadonlyArray<Replacement<ArrayElement>>; }>
    );

export type Replacement<ArrayElement> = Readonly<
  { predicate: (arrayElement: ArrayElement) => boolean; } &
  (
    { newValue: ArrayElement; } |
    { replacer: (currentValueOfElement: ArrayElement) => ArrayElement; }
  )
>;

export type Result<ArrayElement> = Readonly<{
  updatedArray: Array<ArrayElement>;
  indexesOfReplacedElements: Array<number>;
}>;
```

Replaces array elements by one or more predicates, herewith the replacing could be mutable or not depending on dedicated
property of named parameters object.

![](replaceArrayElementsByPredicates-LiveTemplateDemo.gif)

If target array has been copied to clipboard preliminarily, it will be immediately substituted.


## Examples

### Replace one element
#### Mutably

```typescript
const sample: Array<string> = [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];

replaceArrayElementsByPredicates({
  targetArray: experimentalSample,
  predicate: (element: string): boolean => element.includes("O"),
  newValue: "OOO!",
  mutably: true
});

console.log(sample); // => [ "ALPHA", "OOO!", "CHARLIE", "DELTA", "OOO!" ]
```

#### Immutably

```typescript
const sample: Array<string> = [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];

const clonedAndUpdatedSample: Array<string> = replaceArrayElementsByPredicates({
  targetArray: experimentalSample,
  predicate: (element: string): boolean => element.includes("O"),
  newValue: "OOO!",
  mutably: false
})

console.log(clonedAndUpdatedSample); // => [ "ALPHA", "OOO!", "CHARLIE", "DELTA", "OOO!" ]
console.log(sample); // => [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ]
```


### Replace multiple elements
#### Mutably

```typescript
const sample: Array<string> = [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];

replaceArrayElementsByPredicates({
  targetArray: experimentalSample,
  replacements: [
    {
      predicate: (element: string): boolean => element.includes("O"),
      newValue: "OOO!"
    },
    {
      predicate: (element: string): boolean => element.includes("I"),
      replacer: (currentValueOfElement: string): string => `${currentValueOfElement.replace("I", "III")}!!!`
    }
  ],
  mutably: true
});

console.log(sample); // => [ "ALPHA", "OOO!", "CHARLIIIE!!!", "DELTA", "OOO!" ]
```

#### Immutably

```typescript
const sample: Array<string> = [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ];

const clonedAndUpdatedSample: Array<string> =  replaceArrayElementsByPredicates({
  targetArray: experimentalSample,
  replacements: [
    {
      predicate: (element: string): boolean => element.includes("O"),
      newValue: "OOO!"
    },
    {
      predicate: (element: string): boolean => element.includes("I"),
      replacer: (currentValueOfElement: string): string => `${currentValueOfElement.replace("I", "III")}!!!`
    }
  ],
  mutably: false
});

console.log(clonedAndUpdatedSample); // => [ "ALPHA", "OOO!", "CHARLIIIE!!!", "DELTA", "OOO!" ]
console.log(sample); // => [ "ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO" ]
```


## Quick inputting

Use [Live templates](https://www.jetbrains.com/help/idea/using-live-templates.html#live_templates_types) functionality
of [IntelliJ IDEA family IDEs](https://www.jetbrains.com/idea/) (including WebStorm sharpened for web development)
to input the function calling expression quickly (available in [official YDEE plugin](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)):

![](replaceArrayElementsByPredicates-LiveTemplateDemo.gif)

If target array has been copied to clipboard preliminarily, it will be immediately substituted.
