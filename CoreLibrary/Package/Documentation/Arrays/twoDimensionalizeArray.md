# `twoDimensionalizeArray` - convert flat array to two dimensional array

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-twoDimensionalizeArray-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)
[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template_(alias)-tda-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

```
<ArrayElement>(
  sourceData: Readonly<{
    targetFlatArray: ReadonlyArray<ArrayElement>;
    elementsCountPerNestedArray: number;
  }>
): Array<Array<ArrayElement>> {
```

Converts flat array to 2-dimensional array with nested arrays of fixed elements count, herewith the last nested array could
be incomplete.


## Example

Let us split flat `sampleFlatArray` to 2-dimensional array with 3 elements per nested array.
In this case, both nested array will be complete.

```typescript
 const sampleFlatArray: Array<string> = [
  "MUST_BE_FIRST_IN_NESTED_ARRAY",
  "",
  "MUST_BE_LAST_IN_NESTED_ARRAY",
  "MUST_BE_FIRST_IN_NESTED_ARRAY",
  "",
  "MUST_BE_LAST_IN_NESTED_ARRAY"
];

const twoDimensionalArray: Array<Array<string>> = twoDimensionalizeArray({
  targetFlatArray: sampleFlatArray, elementsCountPerNestedArray: 3
});

console.log(twoDimensionalArray.length); // => 2 (two nested arrays)

console.log(twoDimensionalArray[0].length); // => 3
console.log(twoDimensionalArray[1].length); // => 3

console.log(twoDimensionalArray[0].length); // => [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
console.log(twoDimensionalArray[1].length); // => [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
```

In below case, second nested array will be incomplete:

```typescript
const sampleFlatArray: Array<string> = [
  "MUST_BE_FIRST_IN_NESTED_ARRAY",
  "",
  "MUST_BE_LAST_IN_NESTED_ARRAY",
  "MUST_BE_FIRST_IN_NESTED_ARRAY",
  "MUST_BE_LAST_IN_NESTED_ARRAY"
];

console.log(sampleFlatArray[0].length); // => [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
console.log(sampleFlatArray[1].length); // => [ "MUST_BE_FIRST_IN_NESTED_ARRAY", "MUST_BE_LAST_IN_NESTED_ARRAY" ]
```
