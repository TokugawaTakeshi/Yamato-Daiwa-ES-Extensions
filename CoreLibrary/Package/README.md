# Yamato-Daiwa ES Extensions （YDEE）

[![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)]()
[![No dependencies](https://img.shields.io/badge/Dependencies-No_dependencies-brightgreen.svg?style=flat)]()
[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/es-extensions)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
[![IntelliJ IDEA plugin](https://img.shields.io/badge/IntelliJ_IDEA-Official_Plugin-088BF8.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

Helper functions and classes aimed to reduce the routine code. Build-in TypeScript type safety without `any` type.

![Hero image of @yamato-daiwa/es-extensions](https://repository-images.githubusercontent.com/376176365/1423b0e4-c927-4855-8139-78a611826adc)

## Roadmap

* [🛣️ Version 1.4 (2021-22 Winter sprint)](https://yamato-daiwa.myjetbrains.com/youtrack/agiles/121-7/current)
* [🛣️ Version 1.5 (2022 Spring sprint)](https://yamato-daiwa.myjetbrains.com/youtrack/agiles/121-7/122-13)

**Hint:** Set the unlabeled slider in the top right corner of the screen to `XL` to see the tags and descriptions.

![image](https://user-images.githubusercontent.com/41653501/141427403-ca6e9a61-880c-4b1c-bc66-2fdac2f6a491.png)

## ⚠️ Request to Stack Overflow users with `>=1500` reputation

[My account](https://stackoverflow.com/users/4818123/takeshi-tokugawa-yd) has not enough reputation to create the tag
for `@yamato-daiwa/es-extensions` and start to answer the related questions. Please create it instead of me and notify
me to [tokugawa.takesi@gmail.com](mailto:tokugawa.takesi@gmail.com).

* **Tag name**: `@yamato-daiwa/es-extensions`
* **Description**: Helper functions and classes aimed to reduce the routine code. Oriented to TypeScript users investing
  the time to type-safety.

## Installation

```
npm i @yamato-daiwa/es-extensions -E
```

## Documentation

### Get functionality

All available functionality could be imported from `"@yamato-daiwa/es-extensions"`:

```typescript
export { isUndefined, isNull } from "@yamato-daiwa/es-extensions";
```

### Functionality reference

#### RawObjectDataProcessor

The tool for the unknown at advance external data (from HTTP request/response, file, etc.) validation and processing.

* [📖 Quick example](Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#quick-example)
* [📖 Problem overview](Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#problem-overview)
* [📖 Theoretical minimum](Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#theoretical-minimum)
* [📖 Getting started](Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#getting-started)

#### Numbers

* [`formatNumberWith4KetaKanji`](Documentation/Numbers/formatNumberWith4KetaKanji/formatNumberWith4KetaKanji.md)
  Formats number with 4-digits Kanji `万`, `億`, `兆`, `系` (CJK ideographic characters)
* [`isStringifiedNonNegativeIntegerOfRegularNotation`](Documentation/Numbers/isStringifiedNonNegativeIntegerOfRegularNotation/isStringifiedNonNegativeIntegerOfRegularNotation.md)
  Checks is the value of string contains the number of non-scientific notation.
* [`separateEach3DigitsGroupWithComma`](Documentation/Numbers/separateEach3DigitsGroupWithComma/separateEach3DigitsGroupWithComma.md)
  Formats the number separating each 3 digits group with comma
* [`separateEach4DigitsGroupWithComma`](Documentation/Numbers/separateEach4DigitsGroupWithComma/separateEach4DigitsGroupWithComma.md)
  Formats the number separating each 4 digits group with comma

#### Strings

All functions working with strings supports the [surrogate pairs](https://stackoverflow.com/questions/31986614/what-is-a-surrogate-pair).
If some function works incorrectly with surrogate pairs, it means the bug; please feel free to open issue in this case.

* `areStringifiedDigitsOnly` Checks is string value consists exclusively from the digits.
* `capitalizeFirstCharacter` Capitalizes first character of target string value.
* `getLastCharacter` Returns the last character of target string value.
* [`getPositionsOfAllSubstringOccurrences`](Documentation/Strings/getPositionsOfAllSubstringOccurrences.md)
  Returns the positions of each occurrence of specified substring.
* `removeAllSpecifiedCharacters` Removes specified characters from the string value.
* `removeNonDigitsCharacters` Removes all characters from the string excepts digits.
* [`removeNthCharacter`](Documentation/Strings/removeNthCharacter.md)
  Removes the symbol in specified position from the string. Supports the surrogate pairs.
* [`replace2OrMoreSpacesTo1`](Documentation/Strings/replace2OrMoreSpacesTo1.md) replaces 2 or more spaces to 1.
* [`replaceBrHTML_TagToNewLineEscapeSequence`](Documentation/Strings/replaceBrHTML_TagToNewLineEscapeSequence.md)
  Replaces the "br" HTML tag to new line (line feed) escape sequence.
* `insertSubstring` Insets nullable substring with optional condition and transformations.
* `insertSubstringIf` Insets substring conditionally.
* `reverseString` Reverses the characters sequence in string value.
* [`splitString`](Documentation/Strings/splitString.md) Alternative of native `String.prototype.split()`
  supporting surrogate pairs.
* `stringifyAndFormatArbitraryValue` Converts to readable string any type of data.

#### Arrays

* `getArrayElementWhichMustExistByPredicate` Returns the first satisfies to predicate array element. If no such element,
  `UnexpectedEventError` will be thrown.
* `getLastElementOfNonEmptyArray` Return the last element of array. If no such element, `UnexpectedEventError` will be thrown.
* [`getIndexesOfArrayElementsWhichSatisfiesToPredicate`](Documentation/Arrays/getIndexesOfArrayElementsWhichSatisfiesToPredicate.md)
  Returns the array of indexes of elements of array which are satisfies to predicate function.
* [`getIndexOfArrayElementByPredicate`](Documentation/Arrays/getIndexOfArrayElementByPredicate.md)
  Returns the index of array element matching with predicate of `null` if no such element.

#### Sets

* [`addMultipleElementsToSet`](Documentation/Sets/addMultipleElementsToSet/addMultipleElementsToSet.md)
  Adds multiple elements to set.

#### Maps

* [`addMultiplePairsToMap`](Documentation/Maps/addMultiplePairsToMap/addMultiplePairsToMap.md)
  Adds multiple elements to map.
* [`createMapBasedOnOtherMap`](Documentation/Maps/createMapBasedOnOtherMap/createMapBasedOnOtherMap.md)
  Creates map based on other map.
* [`filterMap`](Documentation/Maps/filterMap/filterMap.md)
  Filters map by specified predicate.

#### Date & Time

* [`getDaysCountInSpecificMonth`](Documentation/DateTime/getDaysCountInSpecificMonth.md)
  Return days count in specified year and month.
* [`millisecondsToSeconds`](Documentation/DateTime/millisecondsToSeconds.md)
  Converts milliseconds amount to amount of seconds.
* [`secondsToMilliseconds`](Documentation/DateTime/secondsToMilliseconds.md)
  Converts seconds amount to amount of milliseconds.

#### Types

* [`ParsedJSON` and related](Documentation/Types/ParsedJSON/ParsedJSON.md)
  The native object including the Array case which could be the result of JSON parsing.
* [`InheritEnumerationKeys`](Documentation/Types/InheritEnumerationKeys.md)
  Allows to create the object with same key as reference enumeration.
* `PartialBy` Makes specified properties of base type optional.

#### Type guards

* [Numbers](Documentation/TypeGuards/Numbers/NumberTypeGuards.md)
* [Strings](Documentation/TypeGuards/Strings/StringTypeGuards.md)
* [Objects](Documentation/TypeGuards/Objects/ObjectTypeGuards.md)
* [Arrays](Documentation/TypeGuards/Arrays/ArrayTypeGuards.md)
* [Nullables](Documentation/TypeGuards/Others/OtherTypeGuards.md)

#### Default value subsituters

* `substituteWhenNull` Substitutes the second argument's value when first one is `null`
* `substituteWhenUndefined` Substitutes the second argument's value when first one is `undefined`

#### Value transformers

* `emptyStringToNull`
* `nullToEmptyString`
* `nullToUndefined`
* `nullToZero`
* `undefinedToEmptyArray`
* `undefinedToEmptyString`
* `undefinedToNull`

#### Random values generators

* `getRandomArrayElement` Returns the random element of specified array.
* `getRandomBoolean` Returns `true` or `false` randomly.
* `getRandomInteger` Returns random integer not less than specified `minimalValue` and more than `maximalValue`.
* `getRandomLatinCharacter` Returns random latin character.
* `getRandomObjectPropertyValue` Returns random object property value.
* `getSpecificBooleanValueWithProbability` Returns specific boolean value with specified probability.

#### Constants and enumerations

* [DaysOfWeek](Documentation/ConstantsAndEnumerations/DaysOfWeek.md)
* [HTTP_Methods](Documentation/ConstantsAndEnumerations/HTTP_Methods.md)
* [HTTP_StatusCodes](Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md)
* [MonthsNames](Documentation/ConstantsAndEnumerations/MonthsNames.md)

#### Pagination

* [`computeFirstItemNumberForSpecificPaginationPage`](Documentation/Pagination/computeFirstItemNumberForSpecificPaginationPage/computeFirstItemNumberForSpecificPaginationPage.md)
  Computes the first item number for specified pagination page.
* [`computeLastItemNumberForSpecificPaginationPage`](Documentation/Pagination/computeLastItemNumberForSpecificPaginationPage/computeLastItemNumberForSpecificPaginationPage.md)
  Computes the last item number for specified pagination page.

#### Logging

* [`Logger` facade](Documentation/Logging/Logger/Logger.md)
  Basic facade for providing of the high-quality logging with customizable output destinations, formatting and limitations.
* Pre-made errors
  * `AlgorithmMismatchError` Recommended to throw in general cases when real behaviour of the program is not
    corresponding to desired.
  * `ClassRedundantSubsequentInitializationError` Recommended to throw when the class intended to be a singleton
    has been attempted to initialize twice.
  * `ClassRequiredInitializationHasNotBeenExecutedError` Recommended to throw when the class besides the construction requires
    the initialization, but the initialization has not been executed.
  * `ConfigFileNotFoundError` Recommended to throw when some utility requires the config file bit it has not been found.
  * `CrossBrowserIssueError` Recommended to throw when some processing could not be executed because of certain browsers's
    limitations.
  * `DataRetrievingFailedError`　Recommended to throw when the data retrieving from any external resource (server, database, etc.)
    was failed.
  * `DataSubmittingFailed` Recommended to throw when the data submitting to any external resource (server, database, etc.)
    was failed.
  * `DOM_ElementRetrievingFailedError` Recommended to throw when some requiring element retrieving from the DOM has been failed.
  * `FileReadingFailedError` Recommended to throw when the file reading was not go as expected.
  * `FileWritingFailed` Recommended to throw when the file writing was not go as expected.
  * `ImproperUsageError` Recommended to throw when the cass/function has been attempted to use improperly. However, try to name the
    function/methods such as it will be obvious how to use it and also limit the usage by TypeScript typing.
  * `IncompatiblePropertiesInObjectTypeParameterError` Recommended to throw when in parameter `exampleParameter` of object
    type one of properties `exampleParameter.propertyA` and `exampleParameter.propertyB` must be omitted but both
    has been specified.
  * `InterProcessInteractionFailedError` Recommended to throw when the interaction between NodeJS processed is not going as
    expected. Could be actual for the Electron.js where the main process and render process exchanging by data.
  * `InvalidConfigError` Recommended to throw when config validation was not passed. Append the validation errors messages to
    `InvalidConfigError`'s message.
  * `InvalidExternalDataError` Recommended to throw when the data from the external data source does not match with expected.
    Append the validation errors messages to `InvalidExternalDataError`'s message.
  * `InvalidParameterValueError` Recommended to throw when the parameter's does not fit to some limitations.
    Although the TypeScript allows to define and check the parameter's type, this functionality will not be available
    if the library will be used by JavaScript users. Also, is the parameter has limitations like smallest numerical value
    or maximal characters count, `InvalidParameterValueError` has been developed for such cases.
  * `ModuleDynamicLoadingFailedError` Recommended to throw when the module dynamical loading failed.
  * `UnexpectedEventError` Recommended to throw when the probability of the occurrence of some `else if` branch is very small
    and impossible for normal operation of the program.
  * `UnsupportedScenarioError` Recommended to throw when occurred some scenario which the does not supports yet.