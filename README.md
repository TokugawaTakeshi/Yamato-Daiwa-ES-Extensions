# @yamato-daiwa/es-extensions

<div style="border: 1px solid #F1C40F; padding: 12px 14px">
  ⚠ Currently the library is under development.
</div>


Helper functions and classes aimed to reduce the routine code. Build-in TypeScript type safety without `any` type.


## Installation

```
npm i @yamato-daiwa/es-extensions -E
```


## Temporary simple documentation

Please refer to this documentation during the official documentation is under development.


### Get functionality

Most of the functionality is available for both Browser JavaScript and Node.js.

```typescript
export { isUndefined, isNull } from "@yamato-daiwa/es-extensions";
```


#### BrowserJS functionality

```typescript
export { delegateClickEventHandling } from "@yamato-daiwa/es-extensions/BrowserJS";
```


#### NodeJS functionality

```typescript
export { NodeJS_Timer } from "@yamato-daiwa/es-extensions/NodeJS";
```

### Functionality reference

* Numbers

  * [`formatNumberWith4KetaKanji`](Documentation/Numbers/formatNumberWith4KetaKanji/formatNumberWith4KetaKanji.md) 
    Formats number with 4-digits Kanji `万`, `億`, `兆`, `系` (CJK ideographic characters)
  * [`isStringifiedNonNegativeIntegerOfRegularNotation`](Documentation/Numbers/isStringifiedNonNegativeIntegerOfRegularNotation/isStringifiedNonNegativeIntegerOfRegularNotation.md)
    Checks is the value of string contains the number of non-scientific notation. 
  * [`separateEach3DigitsGroupWithComma`](Documentation/Numbers/separateEach3DigitsGroupWithComma/separateEach3DigitsGroupWithComma.md)
    Formats the number separating each 3 digits group with comma
  * [`separateEach4DigitsGroupWithComma`](Documentation/Numbers/separateEach4DigitsGroupWithComma/separateEach4DigitsGroupWithComma.md)
    Formats the number separating each 4 digits group with comma
  * Pagination related computings
    * [`computeFirstItemNumberForSpecificPaginationPage`](Documentation/Numbers/Pagination/computeFirstItemNumberForSpecificPaginationPage/computeFirstItemNumberForSpecificPaginationPage.md)
      Computes the first item number for specified pagination page.
    * [`computeLastItemNumberForSpecificPaginationPage`](Documentation/Numbers/Pagination/computeLastItemNumberForSpecificPaginationPage/computeLastItemNumberForSpecificPaginationPage.md)
      Computes the last item number for specified pagination page.
      
* Sets
  
  * [`addMultipleElementsToSet`](Documentation/Sets/addMultipleElementsToSet/addMultipleElementsToSet.md)
    Adds multiple elements to set.

* Maps

  * [`addMultiplePairsToMap`](Documentation/Maps/addMultiplePairsToMap/addMultiplePairsToMap.md)
    Adds multiple elements to map.
  * [`createMapBasedOnOtherMap`](Documentation/Maps/createMapBasedOnOtherMap/createMapBasedOnOtherMap.md)
    Creates map based on other map.
  * [`filterMap`](Documentation/Maps/filterMap/filterMap.md)
    Filters map by specified predicate.
    
* Date & Time

  * [`millisecondsToSeconds`](Documentation/DateTime/millisecondsToSeconds/millisecondsToSeconds.md)
    Converts milliseconds amount to amount of seconds.
  * [`secondsToMilliseconds`](Documentation/DateTime/secondsToMilliseconds/secondsToMilliseconds.md)
    Converts seconds amount to amount of milliseconds.
    
* Types

  * [`ParsedJSON` and related](Documentation/Types/ParsedJSON/ParsedJSON.md)
    The native object including the Array case which could be the result of JSON parsing.

* Type guards

  * [Numbers](Documentation/TypeGuards/Numbers/NumberTypeGuards.md)
  * [Strings](Documentation/TypeGuards/Strings/StringTypeGuards.md)
  * [Objects](Documentation/TypeGuards/Objects/ObjectTypeGuards.md)
  * [Arrays](Documentation/TypeGuards/Arrays/ArrayTypeGuards.md)
  * [Nullables](Documentation/TypeGuards/Others/OtherTypeGuards.md)

* [Default values substituters](Documentation/DefaultValueSubstituters/DefaultValueSubstituters.md)
* [Value transformers](Documentation/ValueTransformers/ValueTransformers.md)

* Random values generators

  * `getRandomArrayElement` Returns the random element of specified array.
  * `getRandomBoolean` Returns `true` or `false` randomly.
  * `getRandomInteger` Returns random integer not less than specified `minimalValue` and more than `maximalValue`.
  * `getRandomLatinSymbol` Returns random latin symbol.
  * `getRandomObjectPropertyValue` Returns random object property value.
  * `getSpecificBooleanValueWithProbability` Returns specific boolean value with specified probability.

* Constants and Enumerations
  * [HTTP_Methods](Documentation/ConstantsAndEnumerations/HTTP_Methods)
  * [HTTP_StatusCodes](Documentation/ConstantsAndEnumerations/HTTP_StatusCodes)
