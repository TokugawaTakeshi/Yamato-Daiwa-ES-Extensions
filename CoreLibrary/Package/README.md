# Yamato Daiwa ES Extensions 〔YDEE〕

[![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)]()
[![No dependencies](https://img.shields.io/badge/Dependencies-No_dependencies-brightgreen.svg?style=flat)]()
[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/es-extensions)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
[![IntelliJ IDEA plugin](https://img.shields.io/badge/IntelliJ_IDEA-Official_Plugin-088BF8.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

Helper functions and classes aimed to reduce the routine code. 
Build-in TypeScript type safety without `any` type.
Oriented to TypeScript users investing the time to quality including type-safety.

![Hero image of @yamato-daiwa/es-extensions](https://repository-images.githubusercontent.com/376176365/f2eda148-6781-4205-ba2c-bd5f61da370f)


## Installation

```
npm i @yamato-daiwa/es-extensions -E
```


## Notice about "Unpacked size" (displaying in npmjs.com)

The displaying "Unpacked size" (for example, 633 kB for version 1.4.5 as in image below) is the 
**total size of all built CommonJS and ECMAScript modules**.

![image](https://user-images.githubusercontent.com/41653501/168949802-72554886-39b0-43b1-9813-43f7c4405f69.png)

ECMAScript modules are preferred for the browser JavaScript while CommonJS - for Node.js.

For the websites and web applications where each kilobyte on count it is possible to automatically exclude the unused 
functionality of **@yamato-daiwa/es-extensions** (and possibly other dependencies) from built JavaScript.
The JavaScript bundlers like [Webpack](https://webpack.js.org) can exclude the unused functionality under certain conditions.
For the TypeScript and Webpack combination case, it is required to use ECMAScript modules to activate the
[tree shaking](https://webpack.js.org/guides/tree-shaking/) functionality (works on production mode).


## Documentation

### Get functionality

All available functionality could be imported from `@yamato-daiwa/es-extensions`:

```typescript
export { isUndefined, isNull } from "@yamato-daiwa/es-extensions";
```

### Functionality reference

#### RawObjectDataProcessor

The tool for the validation and processing of unknown at advance external data (from HTTP requests/responses, files, etc.).

* [📖 Quick example](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#quick-example)
* [📖 Problem overview](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#problem-overview)
* [📖 Theoretical minimum](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#theoretical-minimum)
* [📖 Getting started](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#getting-started)


##### Pre-made pre-validation modifiers

Intended to be used when some property is expected to be the string but also expected to be a valid number if to parse it.

<dl>

  <dt>convertPotentialStringToFloatIfPossible</dt>
  <dd>Tries to convert the string to decimal fraction; returns the number in success case otherwise returns the initial value.</dd>

  <dt>convertPotentialStringToIntegerIfPossible</dt>
  <dd>Tries to convert the string to integer; returns the number in success case otherwise returns the initial value.</dd>

  <dt>convertPotentialStringToNumberIfPossible</dt>
  <dd>
    Tries to convert the string to integer or decimal fraction (depending on decimal part separator presence); 
    returns the number in success case otherwise returns the initial value.
  </dd>

</dl>


#### Numbers

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/formatNumberWith4KetaKanji/formatNumberWith4KetaKanji.md">formatNumberWith4KetaKanji</a></dt>
  <dd>Formats number with 4-digits Kanji 万, 億, 兆, 系 (CJK ideographic characters)</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/getArithmeticMean.md">getArithmeticMean</a></dt>
  <dd>Computed the arithmetic mean of arbitrary quantity of number.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/isStringifiedNonNegativeIntegerOfRegularNotation/isStringifiedNonNegativeIntegerOfRegularNotation.md">isStringifiedNonNegativeIntegerOfRegularNotation</a></dt>
  <dd>Checks is the value of string contains the number of non-scientific notation.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/roundDownToSpecificIntegerPlaceValue.md">roundDownToSpecificIntegerPlaceValue</a></dt>
  <dd>Rounds up the number to specific nearest integer place value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/roundToSpecificNearestIntegerPlaceValue.md">roundToSpecificNearestIntegerPlaceValue</a></dt>
  <dd>Rounds the number to specific nearest integer place value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/roundToSpecifiedNearestDecimalPlaceValue/roundToSpecifiedNearestDecimalPlaceValue.md">roundToSpecifiedNearestDecimalPlaceValue</a></dt>
  <dd>Rounds the number to specific decimal place (tens, hundreds, thousands, etc.).</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/roundUpToSpecificIntegerPlaceValue.md">roundUpToSpecificIntegerPlaceValue</a></dt>
  <dd>Rounds the number to specific nearest integer place value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/separateEach3DigitsGroupWithComma/separateEach3DigitsGroupWithComma.md">separateEach3DigitsGroupWithComma</a></dt>
  <dd>Formats the number separating each 3 digits group with comma</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Numbers/separateEach4DigitsGroupWithComma/separateEach4DigitsGroupWithComma.md">separateEach4DigitsGroupWithComma</a></dt>
  <dd>Formats the number separating each 4 digits group with comma</dd>

</dl>


#### Strings

All functions working with strings are supporting the [surrogate pairs](https://stackoverflow.com/questions/31986614/what-is-a-surrogate-pair).
If some function works incorrectly with surrogate pairs, it means the bug; please feel free to open issue in this case.

<dl>

  <dt>areStringifiedDigitsOnly</dt>
  <dd>Checks is string value consists exclusively from the digits.</dd>

  <dt>capitalizeFirstCharacter</dt>
  <dd>Capitalizes first character of target string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/EmailAddress.md">EmailAddress</a></dt>
  <dd>Class working with email addresses. Currently, consists from validating function and regular expression of valid emails.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/explodeCasedPhraseToWords.md">explodeCasedPhraseToWords</a></dt>
  <dd>Explodes the string containing grammatically normal or cased (camel case, snake case, etc.) expression to words and returns the array of them. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt>getLastCharacter</dt>
  <dd>Returns the last character of target string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/getPositionsOfAllSubstringOccurrences.md">getPositionsOfAllSubstringOccurrences</a></dt>
  <dd>Returns the positions of each occurrence of specified substring.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/hasStringOnlySpecificCharacters.md">hasStringOnlySpecificCharacters</a></dt>
  <dd>Checks does string including specified characters only without regular expression</dd>

  <dt>removeAllSpecifiedCharacters</dt>
  <dd>Removes specified characters from the string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeLastCharacter.md">removeLastCharacter</a></dt>
  <dd>Removes last character.</dd>

  <dt>removeNonDigitsCharacters</dt>
  <dd>Removes all characters from the string except digits.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeNthCharacter.md">removeNthCharacter</a></dt>
  <dd>Removes the character in specified position from the string. Supports the surrogate pairs.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeSpecificCharacterFromCertainPosition.md">removeSpecificCharacterFromCertainPosition</a></dt>
  <dd>Removes specific character from the specific position.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/replace2OrMoreSpacesTo1.md">replace2OrMoreSpacesTo1</a></dt>
  <dd>Replaces 2 or more spaces to 1.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/replaceBrHTML_TagToNewLineEscapeSequence.md">replaceBrHTML_TagToNewLineEscapeSequence</a></dt>
  <dd>Replaces the "br" HTML tag to new line (line feed) escape sequence.</dd>

  <dt>insertSubstring</dt>
  <dd>Insets nullable substring with optional condition and transformations.</dd>

  <dt>insertSubstringIf</dt>
  <dd>Insets substring conditionally.</dd>
  
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/isIPv4AddressLiesInRange.md">isIPv4AddressLiesInRange</a></dt>
  <dd>Check does specified IP address lies in specific range.</dd>

  <dt>reverseString</dt>
  <dd>Reverses the characters sequence in string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/splitString.md">splitString</a></dt>
  <dd>Alternative of native <code>String.prototype.split()</code>; unlike it supports the UTF16 surrogate pairs.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/stringifyAndFormatArbitraryValue/stringifyAndFormatArbitraryValue.md">stringifyAndFormatArbitraryValue</a></dt>
  <dd>Converts to readable string and formats if possible any type of data.</dd>

  <dt>replaceDoubleBackslashesWithForwardSlashes</dt>
  <dd>Replaces double backslashes with forward slashes.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toLowerCamelCase.md">toLowerCamelCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to (lower) camel case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toScreamingSnakeCase.md">toScreamingSnakeCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to screaming snake case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toUpperCamelCase.md">toUpperCamelCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to upper camel case AKA Pascal case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/trimSpaces/trimSpaces.md">trimSpaces</a></dt>
  <dd>Trims prepended and/or appended space characters; unlike native <code>String.prototype.trim()</code> acts selectively on specified spaces kinds.</dd>
 
</dl>


#### Objects

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Objects/getObjectPropertySafely.md">getObjectPropertySafely</a></dt>
  <dd>
    Works as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining">optional chaining</a> but could be used for any fully-qualified name and returns value which being considered as <code>unknown</code>. 
    Intended to be used when the schema of value is not known enough (for example, because of lack of TypeScript type definition).
  </dd>
</dl>


#### Arrays
##### Retrieving of elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html">getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</a></dt>
  <dd>Returns the element of specified array matching with the predicate if such element is exactly one, otherwise error will be thrown or null will be returned depending on dedicated option's value.</dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/getLastElementOfArray/getLastElementOfArray.english.html">getLastElementOfArray</a></dt>
  <dd>Returns the last element of array, herewith depending on dedicated parameter either <b>UnexpectedEventError</b> will be thrown of null will be returned if target array is empty.</dd>

</dl>


##### Retrieving of indexes 

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/getIndexesOfArrayElementsWhichSatisfiesThePredicate/getIndexesOfArrayElementsWhichSatisfiesThePredicate.md">getIndexesOfArrayElementsWhichSatisfiesThePredicate</a></dt>
  <dd>Returns the array of indexes of array elements which are satisfies to predicate function.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.md">getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</a></dt>
  <dd>Returns the index of array element satisfies the predicate if such element is exactly one, otherwise error will be thrown or null will be returned depending on dedicated option's value.</dd>

</dl>


##### Replacing of elements

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.md">replaceArrayElementsByIndexesImmutably</a></dt>
  <dd>Creates the copy of target array and replaces the elements by specified indexes.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.md">replaceArrayElementsByPredicates</a></dt>
  <dd>Replaces array elements by one or more predicates, herewith the replacing could be mutable or not depending on dedicated option.</dd>

</dl>


##### Adding of elements

<dl>
  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/addElementsToArray/addElementsToArray.english.html">addElementsToArray</a></dt>
  <dd>Adds one or more elements to the start, end or specified position of target array, herewith the adding could be mutable or not depending on dedicated property of named parameters object.</dd>
</dl>


##### Removing of elements

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByIndexes/removeArrayElementsByIndexes.md">removeArrayElementsByIndexes</a></dt>
  <dd>Removes array elements by indexes, herewith the removing could be mutable or not depending on dedicated option.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByPredicates/removeArrayElementsByPredicates.md">removeArrayElementsByPredicates</a></dt>
  <dd>Removes array elements by one or more predicates, herewith the removing could be mutable or not depending on dedicated option.</dd>

</dl>


##### Other

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/twoDimensionalizeArray.md">twoDimensionalizeArray</a></dt>
  <dd>Converts flat array to 2-dimensional array with nested arrays of fixed elements count.</dd>
</dl>


#### Sets

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Sets/addMultipleElementsToSet/addMultipleElementsToSet.md">addMultipleElementsToSet</a></dt>
  <dd>Adds multiple elements to set.</dd>
</dl>



#### Maps

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Maps/addMultiplePairsToMap/addMultiplePairsToMap.md">addMultiplePairsToMap</a></dt>
  <dd>Adds multiple entries to map.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Maps/createMapBasedOnOtherMap/createMapBasedOnOtherMap.md">createMapBasedOnOtherMap</a></dt>
  <dd>Creates map based on other map.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Maps/filterMap/filterMap.md">filterMap</a></dt>
  <dd>Filters map by specified predicate.</dd>

</dl>


#### Date and Time

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getDaysCountInSpecificMonth.md">getDaysCountInSpecificMonth</a></dt>
  <dd>Returns days count in specified year and month.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getMonthNameByNumber.md">getMonthNameByNumber</a></dt>
  <dd>Converts the month number (from 0 or 1) to element of <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md">MonthsNames</a> enumeration.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getMonthNumberByName.md">getMonthNumberByName</a></dt>
  <dd>Converts the element of <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md">MonthsNames</a> enumeration to number of month (from 0 or 1).</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getNextMonthNumber.md">getNextMonthNumber</a></dt>
  <dd>Returns next month number in relation to specified year and month number; numeration from 0 and 1 is available for both parameter and returned value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getPreviousMonthNumber.md">getPreviousMonthNumber</a></dt>
  <dd>Returns previous month number in relation to specified year and month number; numeration from 0 and 1 is available for both parameter and returned value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getYearOfNextMonth.md">getYearOfNextMonth</a></dt>
  <dd>Returns the year of next month in relation to specified year and month.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getYearOfPreviousMonth.md">getYearOfPreviousMonth</a></dt>
  <dd>Returns the year of previous month in relation to specified year and month.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/millisecondsToSeconds.md">millisecondsToSeconds</a></dt>
  <dd>Converts milliseconds amount to amount of seconds.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/secondsToMilliseconds.md">secondsToMilliseconds</a></dt>
  <dd>Converts seconds amount to amount of milliseconds.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/TimePoint.md">TimePoint</a></dt>
  <dd>The alternative to native <b>Date</b> allows to build the formatted date/time strings easily.</dd>

</dl>


#### Types

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Types/ParsedJSON/ParsedJSON.md"><b>ParsedJSON</b> and related</a></dt>
  <dd>The native object including the Array case which could be the result of JSON parsing.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Types/InheritEnumerationKeys.md">InheritEnumerationKeys</a></dt>
  <dd>Allows to create the object with same keys as reference enumeration.</dd>

  <dt>PartialBy</dt>
  <dd>Makes specified properties of base type optional.</dd>

</dl>


#### Type guards

* [Numbers](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Numbers/NumberTypeGuards.md)
* [Strings](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Strings/StringTypeGuards.md)
* [Objects](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Objects/ObjectTypeGuards.md)
* [Arrays](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Arrays/ArrayTypeGuards.md)
* [Nullables](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Nullables/NullableTypeGuards.md)
* [Other](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Others/OtherTypeGuards.md)


#### Default value subsituters

The [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
makes below functions redundant, but they still could be used in the environments with old ECMAScript versions.

<dl>

  <dt>substituteWhenNull</dt>
  <dd>Substitutes the second argument's value when first one is null.</dd>

  <dt>substituteWhenUndefined</dt>
  <dd>Substitutes the second argument's value when first one is <b>undefined</b>.</dd>

</dl>



#### Value transformers

* emptyStringToNull
* nullToEmptyString
* nullToUndefined
* nullToZero
* undefinedToEmptyArray
* undefinedToEmptyString
* undefinedToNull


#### Random values generators

<dl>

  <dt>getRandomArrayElement</dt>
  <dd>Returns the random element of specified array.</dd>

  <dt>getRandomBoolean</dt>
  <dd>Returns "true" or "false" randomly.</dd>

  <dt>getRandomInteger</dt>
  <dd>Returns random integer not less than specified **minimalValue** and more than **maximalValue**.</dd>

  <dt>getRandomLatinCharacter</dt>
  <dd>Returns random latin character.</dd>

  <dt>getRandomObjectPropertyValue</dt>
  <dd>Returns random object property value.</dd>

  <dt>getRandomSubarray</dt>
  <dd>Returns the selection of elements of specified array; minimal and maximal elements count could be specified.</dd>

  <dt>getSpecificBooleanValueWithProbability</dt>
  <dd>Returns specific boolean value with specified probability.</dd>

</dl>


#### Constants and enumerations

##### Date and time

<dl>

  <dt>CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING</dt>
  <dd>
    The character count represents the date without time in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO8601 string</a>. 
    Has value <b>10</b>; for example, in the <code>2013-03-10T02:00:00Z</code> case the first 10 characters will be <code>2013-03-10</code>.
    If you need to extract this date part from ISO8601 string (not just know the characters count), use <a href="Documentation/DateTime/getISO8601StringWithoutTimePart.md"><code>getISO8601StringWithoutTimePart</code></a> function.
  </dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/DaysOfWeek.md">DaysOfWeek</a></dt>
  <dd>Allows to refer to the day of week by name, not by number what usually confusing with numeration from 0 (and also, first day of week is location dependent).</dd>

  <dt>HOURS_PER_STELLAR_DAY</dt>
  <dd>
    Has value <b>24</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MAXIMAL_DAYS_IN_MONTH</dt>
  <dd>
    Has value <b>31</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MINUTES_PER_HOUR</dt>
  <dd>
    Has value <b>60</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MONTHS_PER_YEAR</dt>
  <dd>
    Has value <b>12</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md">MonthsNames</a></dt>
  <dd>Allows to refer to the month by name, not by number what usually confusing with numeration from 0.</dd>

  <dt>SECONDS_PER_MINUTE</dt>
  <dd>
    Has value <b>60</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

</dl>


##### HTTP

* [HTTP_Methods](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_Methods.md)
* [HTTP Status codes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md)
  * [All](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#http_statuscodes---all-http-status-codes)
  * [Information responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#informationalresponseshttp_statuscodes---information-responses)
  * [Successful responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#successfulresponseshttp_statuscodes---successful-responses)
  * [Redirection messages](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#redirectionresponseshttp_statuscodes---redirection-messages)
  * [Client error responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#clienterrorshttp_statuscodes---client-error-responses)
  * [Server error responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#servererrorshttp_statuscodes---server-error-responses)


#### Pagination

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Pagination/computeFirstItemNumberForSpecificPaginationPage/computeFirstItemNumberForSpecificPaginationPage.md">computeFirstItemNumberForSpecificPaginationPage</a></dt>
  <dd>Computes the first item number for specified pagination page.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Pagination/computeLastItemNumberForSpecificPaginationPage/computeLastItemNumberForSpecificPaginationPage.md">computeLastItemNumberForSpecificPaginationPage</a></dt>
  <dd>Computes the last item number for specified pagination page.</dd>

</dl>


#### Logging

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md"><b>Logger</b> facade</a></dt>
  <dd>Basic facade for providing of the high-quality logging with customizable output destinations, formatting and limitations.</dd>

  <dt>Pre-made errors</dt>
  <dd>
    <dl>
      <dt>AlgorithmMismatchError</dt>
      <dd>Intended to be used in general cases when actual behaviour does not match with desired.</dd>
      <dt>ClassRedundantSubsequentInitializationError</dt>
      <dd>Intended to be used when the class developed as singleton has been attempted to initialize twice.</dd>
      <dt>ClassRequiredInitializationHasNotBeenExecutedError</dt>
      <dd>Intended to be used when the class besides the construction requires the initialization but the initializing method has not been called.</dd>
      <dt>ConfigFileNotFoundError</dt>
      <dd>Intended to be used when some utility requires the config file but it has not been found.</dd>
      <dt>CrossBrowserIssueError</dt>
      <dd>Intended to be used when some processing could not be executed because of certain browsers's limitations.</dd>
      <dt>DataRetrievingFailedError</dt>
      <dd>Intended to be used when the data retrieving from some external resource (server, database, file, etc.) failed.</dd>
      <dt>DataSubmittingFailed</dt>
      <dd>Intended to be used when the data submitting to any external resource (server, database, etc.) failed.</dd>
      <dt>DOM_ElementRetrievingFailedError</dt>
      <dd>
        Intended be used when some element retrieving from the DOM has been failed.
        It could occur not only on client side but also on server side, during rendering or HTML code processing.
      </dd>
      <dt>FileReadingFailedError</dt>
      <dd>Intended to be used when the file reading was not go as expected</dd>
      <dt>ImproperUsageError</dt>
      <dd>
        Intended to be used when the class/function has been attempted to use improperly. 
        Herewith, try to name the function/methods such as it will be obvious how to use it and also limit the usage by TypeScript typing.
      </dd>
      <dt>IncompatiblePropertiesInObjectTypeParameterError</dt>
      <dd>
        Intended to be used when in parameter <b>exampleParameter</b> of object type one of properties 
        <b>exampleParameter.propertyA</b> and <b>exampleParameter.propertyB</b> must be omitted but both has been specified.
      </dd>
      <dt>InterProcessInteractionFailedError</dt>
      <dd>
        Intended to be used when the interaction between NodeJS processed is not going as expected. 
        Could be actual, for example, for the Electron.js where the main process and render process are exchanges by data.
      </dd>
      <dt>InvalidConfigError</dt>
      <dd>
        Intended to be used when config validation was not passed.
        Appending of the validation errors messages to <b>InvalidConfigError</b>'s message is strongly recommended.
      </dd>
      <dt>InvalidExternalDataError</dt>
      <dd>
        Intended to be used when the data from the external data source does not match with expected. 
        Appending of the validation errors messages to <b>InvalidExternalDataError</b>'s message is strongly recommended.</dd>
      <dt>InvalidParameterValueError</dt>
      <dd>
        Intended to be used when the parameter's does not fit to some limitations.
        Although the TypeScript allows to define and check the parameter's type, no type check will not be executed
        once TypeScript will be compiled to JavaScript. Also, is the parameter has limitations like smallest numerical 
        value or maximal characters count, <b>InvalidParameterValueError</b> has been developed for such cases.
      </dd>
      <dt>ModuleDynamicLoadingFailedError</dt>
      <dd>Recommended to throw when the module dynamical loading failed. Actual for bundlers like Webpack.</dd>
      <dt>UnexpectedEventError</dt>
      <dd>
        Intended to be used when the probability of the occurrence of some "else if" branch is very small and 
        impossible for normal operation of the program.
      </dd>
      <dt>UnsupportedScenarioError</dt>
      <dd>Intended to be used when occurred some scenario which is not supported yet.</dd>
    </dl>
  </dd>
</dl>
