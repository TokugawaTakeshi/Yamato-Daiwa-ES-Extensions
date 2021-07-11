# @yamato-daiwa/es-extensions

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
      
* Strings

  * `areStringifiedDigitsOnly` Checks is string value consists exclusively from the digits.
  * `capitalizeFirstSymbol` Capitalizes first symbol of target string value.
  * `getLastSymbol` Returns the last symbol of target string value.
  * [`getPositionsOfAllSubstringOccurrences`](Documentation/Strings/getPositionsOfAllSubstringOccurrences.md) 
    Returns the positions of each occurrence of specified substring.
  * `removeAllSpecifiedCharacters` Removes specified characters from the string value.
  * `removeNonDigitsCharacters` Removes all characters from the string excepts digits.
  * `insertSubstring` Insets nullable substring with optional condition and transformations.
  * `insertSubstringIf` Insets substring conditionally.
  * `reverseString` Reverses the symbols sequence in string value.
  * `stringifyAndFormatUnknownAtAdvanceEntity` Converts to readable string any type of data.
  
* Arrays

  * [`getIndexesOfArrayElementsWhichSatisfiesToPredicate`](Documentation/Arrays/getIndexesOfArrayElementsWhichSatisfiesToPredicate.md) 
  Returns the array of indexes of elements of array which are satisfies to predicate function.
  * [`getIndexOfArrayElementByPredicate`](Documentation/Arrays/getIndexOfArrayElementByPredicate.md)
  Returns the index of array element matching with predicate of `null` if no such element.
  

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
  * [HTTP_Methods](Documentation/ConstantsAndEnumerations/HTTP_Methods/HTTP_Methods.md)
  * [HTTP_StatusCodes](Documentation/ConstantsAndEnumerations/HTTP_StatusCodes/HTTP_StatusCodes.md)

* Logging

  * [`Logger` facade](Documentation/Logging/Logger/Logger.md) 
      Basic facade for providing of the high-quality logging with customizable output destinations, formatting and limitations.
  * [`BasicFrontEndLogger`](Documentation/BrowserJS/Logging/BasicFrontEndLogger/BasicFrontEndLogger.md)
      The implementation of `ILogger` interface for the `Logger` facade which could be used as the base of the custom implementation
      for the frontend side of the websites / web application.
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
    * `InterProcessInteractionFailedError` Recommended to throw when the interaction between NodeJS processed is not going as
        expected. Could be actual for the Electron.js where the main process and render process exchanging by data.
    * `InvalidConfigError` Recommended to throw when config validation was not passed. Append the validation errors messages to
        `InvalidConfigError`'s message.
    * `InvalidExternalDataError` Recommended to throw when the data from the external data source does not match with expected.
        Append the validation errors messages to `InvalidExternalDataError`'s message.
    * `InvalidParameterValueError` Recommended to throw when the parameter's does not fit to some limitations.
        Although the TypeScript allows to define and check the parameter's type, this functionality will not be available
        if the library will be used by JavaScript users. Also, is the parameter has limitations like smallest numerical value
        or maximal symbols count, `InvalidParameterValueError` has been developed for such cases. 
    * `ModuleDynamicLoadingFailedError` Recommended to throw when the module dynamical loading failed.
    * `UnexpectedEventError` Recommended to throw when the probability of the occurrence of some `else if` branch is very small
        and impossible for normal operation of the program.
    * `UnsupportedScenarioError` Recommended to throw when occurred some scenario which the does not supports yet. 
