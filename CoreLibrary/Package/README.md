# Yamato Daiwa ES Extensions (YDEE)

[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/README.md)
![MIT](https://img.shields.io/badge/MIT-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
[![IntelliJ IDEA plugin](https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/es-extensions)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)
![No third-party dependencies](https://img.shields.io/badge/Dependencies-No--third_party_dependencies-brightgreen.svg?style=flat)

[![GitHub Sponsors](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions?sponsor=1)
[![PAYPAL](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/tokugawatakeshi)
[![LIBERAPAY](	https://img.shields.io/badge/Liberapay-F6C915?style=for-the-badge&logo=liberapay&logoColor=black)](https://liberapay.com/TokugawaT-YD)


Helper functions and classes aimed to reduce the routine code. 
Build-in TypeScript type safety without `any` type.
Oriented to TypeScript users investing the time to quality including type-safety.

![Hero image of @yamato-daiwa/es-extensions](https://repository-images.githubusercontent.com/376176365/ab848ff3-8bfb-4142-8b8f-fe191340bb3a)


## Installation

```
npm i @yamato-daiwa/es-extensions -E
```

## Documentation

### Getting Started

+ [Installation](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#INSTALLATION--SECTION)
+ [Information About Distribution Size](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#DISTRIBUTIVE_VOLUME_NOTICE--SECTION)
+ [Precautions for Non-Users of TypeScript](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#NON_TYPE_SCRIPT_USAGE_WARNING--SECTION)
+ [Importing Functionality](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#IMPORTING_OF_FUNCTIONALITY--SECTION)


### AJAX

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html"><code>AJAX_Service</code></a></dt>
  <dd>
    <p>
      The facade for convenient usage of <a href="https://developer.mozilla.org/en-US/docs/Glossary/AJAX">AJAX</a> with
        maximal type-safety and less code.
    </p>
    <ul>
      <li>
        Integrated with <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/RawObjectDataProcessor.english.html"><code>RawObjectDataProcessor</code></a>
          for validation of response data.
      </li>
      <li>
        Needs some implementation, but there is the pre-made one:
          <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/FetchAPI_Service/FetchAPI_Service.english.html"><code>FetchAPI_Service</code></a>.
      </li>
    </ul>
  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/FetchAPI_Service/FetchAPI_Service.english.html"><code>FetchAPI_Service</code></a></dt>
  <dd>
    The implementation of <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html"><code>AJAX_Service</code></a>
      abstract class based on <a href="https://developer.mozilla.org/ru/docs/Web/API/Fetch_API">Fetch API</a>. 
    Works with all modern browsers, and also stable in Node.js since version <strong>22</strong>. 
  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/AJAX/URI_QueryParametersSerializer/URI_QueryParametersSerializer.english.html"><code>URI_QueryParametersSerializer</code></a><dt>
  <dd>
    The function-like <a href="https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#reusable-types-type-aliases">TypeScript type</a>
      used by <a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html"><code>AJAX_Service</code></a>
      and should be used to implement the custom serializing algorithm for URI query parameters.  
  </dd>

</dl>


### Arrays
#### Creating

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/00-Creating/createArrayOfNaturalNumbers/createArrayOfNaturalNumbers.english.html"><code>createArrayOfNaturalNumbers</code></a></dt>
  <dd>
    Obviously from the function name, creates an array of natural numbers.
    Elements count, assessing/descending and starting number can be specified.
  </dd>

</dl>


#### Retrieving of Elements


<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html"><code>getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</code></a></dt>
  <dd>
    Returns the element of a specified array matching with the predicate if such an element is exactly one, 
      otherwise error will be thrown or null will be returned depending on dedicated option's value.
  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getLastElementOfArray/getLastElementOfArray.english.html"><code>getLastElementOfArray</code></a></dt>
  <dd>
    Returns the last element of an array if such element exists, otherwise error will be thrown as default
      or null will be returned if the dedicated option has been specified.
  </dd>

</dl>


#### Retrieving of Indexes

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements/getIndexesOfSatisfiesThePredicateArrayElements.english.html"><code>getIndexesOfSatisfiesThePredicateArrayElements</code></a></dt>
  <dd>
    Obviously from the function name, returns the array of indexes of array elements which are satisfied to specified 
      predicate function.
  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html"><code>getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</code></a></dt>
  <dd>
    Returns the index of the array element satisfies the predicate if such element is exactly one, otherwise error will 
      be thrown or null will be returned depending on dedicated option's value.
  </dd>

</dl>


#### Retrieving of Subarrays

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/03-RetrievingOfSubarrays/cropArray/cropArray.english.html"><code>cropArray</code></a></dt>
  <dd>
    <p>
      Creates the subarray of the specified array.
      In comparison with native <code>slice</code> and <code>splice</code> methods, suggests the extremely flexible API.
    </p>
    <ul>
      <li>Mutable and immutable cropping</li>
      <li>Specifying of starting element and ending element either from the start or from the end of an array</li>
      <li>Absolute and relative specifying of starting and ending elements of subarray</li>
      <li>Inclusive and exclusive absolute specifying of last element of subarray</li>
    </ul>
      
  </dd>

</dl>


#### Adding of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/04-AddingOfElements/addElementsToArray/addElementsToArray.english.html"><code>addElementsToArray</code></a></dt>
  <dd>
    Adds one or more elements to the start, end or specified position of the target array, herewith the adding can be 
      mutable or not depending on dedicated property of the named parameters object.
  </dd>

</dl>


#### Replacing of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/05-ReplacingOfElements/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.english.html"><code>replaceArrayElementsByIndexesImmutably</code></a></dt>
  <dd>Creates the swallow copy of the target array and replaces the elements by specified indexes.</dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/05-ReplacingOfElements/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.english.html"><code>replaceArrayElementsByPredicates</code></a></dt>
  <dd>Replaces array elements by one or more predicates, herewith the replacing could be mutable or no depending on dedicated option.</dd>

</dl>


#### Permutations of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/06-PermutationsOfElements/moveArrayElementToOnePosition/moveArrayElementToOnePosition.english.html"><code>moveArrayElementToOnePosition</code></a></dt>
  <dd>
    Moves specified by an index element to left or to right, herewith the ousted element will be placed to position of target one.
    Mutable and immutable swapping are available.
  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/06-PermutationsOfElements/swapArrayElements/swapArrayElements.english.html"><code>swapArrayElements</code></a></dt>
  <dd>
    <par>Swaps two array elements, not obligatory the siblings.</par>
    <ul>
      <li>Each element can be specified by index, by number from 1 or via predicate.</li>
      <li>Mutable and immutable swapping are available</li>
    </ul>

  </dd>

</dl>


#### Removing of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/07-RemovingOfElements/removeArrayElementsByIndexes/removeArrayElementsByIndexes.english.html"><code>removeArrayElementsByIndexes</code></a></dt>
  <dd>Removes array elements by indexes, herewith the removing could be mutable or not depending on dedicated option.</dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/07-RemovingOfElements/removeArrayElementsByPredicates/removeArrayElementsByPredicates.english.html"><code>removeArrayElementsByPredicates</code></a></dt>
  <dd>Removes array elements by one or more predicates, herewith the removing could be mutable or not depending on dedicated option.</dd>

</dl>


#### Restructuring

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/08-Restructuring/twoDimensionalizeArray/twoDimensionalizeArray.english.html"><code>twoDimensionalizeArray</code></a></dt>
  <dd>Converts a flat array to 2-dimensional array with nested arrays of fixed elements count.</dd>

</dl>


##### Other

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/09-Other/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove.english.html"><code>addElementsToArrayIfTheyAreNotPresentOtherwiseRemove</code></a></dt>
  <dd>
    <p>Obviously from the function name, add elements to array if they are nor present otherwise remove.</p>
    <ul>
      <li>
        For all types of elements except numbers, bigints, strings and booleans the element finding predicate must be
          specified.
      </li>
       <li>Mutable and immutable manipulations are available</li>
    </ul>
  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/09-Other/readonlyArrayToMutableOne/readonlyArrayToMutableOne.english.html"><code>readonlyArrayToMutableOne</code></a></dt>
  <dd>
    <ul>
      <li>
        From the viewpoint of TypeScript, allows to mutate the <code>ReadonlyArray</code> what basically not recommeded
          but in some particular cases almost inevitably.
      </li>
      <li>Fron the viewpoint of JavaScript, does nothing.</li>
    </ul>
  </dd>
  

</dl>


### Data Mocking

+ [`DataMocking` Class/Namespace](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Source/DataMocking/DataMocking.ts)
+ [`MockGatewayHelper` Class/Namespace](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Source/DataMocking/MockGatewayHelpler/MockGatewayHelper.ts)


### Date and Time

<dl>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/CalendarBuilder.ts">
      <code>CalendarBuilder</code>
    </a>
  </dt>
  <dd>
    Generates a flat array of 42 elements or 6x7 two-dimensional array for filling of calendar page.
    Besides, Sunday any day of week can be specified as first day of week.
  </dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/convert24_HoursFormatTo12_HoursFormat.ts">
      <code>convert24_HoursFormatTo12_HoursFormat</code>
    </a>
  </dt>
  <dd>
    As it obvious from the name, converts the hours amount from 24-hour format to 12-hour format.
    Of course, besides the amount it also will be returned the boolean values to identify is amount corresponding to
      before or after midnight.
  </dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Documentation/DateTime/DateWithoutTime.md">
      <code>DateWithoutTime</code>
    </a>
  </dt>
  <dd>
    An alternative of native <code>Date</code> (which actually is not only the Date but also the time).
    As it obvious from the name, works only with date not associated with specific time zone and does not work with time.
    The most demanded functionality is <code>format</code> static method allows defining the arbitrary formatting of 
      target date with optimized computing.
  </dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getDaysCountInSpecificMonth.md">
      <code>getDaysCountInSpecificMonth</code>
    </a>
  </dt>
  <dd>Returns days count in specified year and month.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/getISO8601_StringWithoutTimePart.ts">
      <code>getISO8601_StringWithoutTimePart</code>
    </a>
  </dt>
  <dd>
    Obviously to function name, returns the date definition without time in ISO8601 format.
    The parameters can be defined by various methods.
  </dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getMonthNameByNumber.md">
      <code>getMonthNameByNumber</code>
    </a>
  </dt>
  <dd>Converts the month number (from 0 or 1) to element of <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md"><code>MonthsNames</code> enumeration</a>.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getMonthNumberByName.md">
      <code>getMonthNumberByName</code>
    </a>
  </dt>
  <dd>Converts the element of <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md"><code>MonthsNames</code> enumeration</a> to number of month (from 0 or 1).</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getNextMonthNumber.md">
      <code>getNextMonthNumber</code>
    </a>
  </dt>
  <dd>Returns next month number in relation to specified year and month number; numeration from 0 and 1 is available for both parameter and returned value.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getPreviousMonthNumber.md">
      <code>getPreviousMonthNumber</code>
    </a>
  </dt>
  <dd>Returns previous month number in relation to specified year and month number; numeration from 0 and 1 is available for both parameter and returned value.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getYearOfNextMonth.md">
      <code>getYearOfNextMonth</code>
    </a>
  </dt>
  <dd>Returns the year of next month in relation to specified year and month.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getYearOfPreviousMonth.md">
      <code>getYearOfPreviousMonth</code>
    </a>
  </dt>
  <dd>Returns the year of previous month in relation to specified year and month.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/hasTimeCome.ts">
      <code>hasTimeCome</code>
    </a>
  </dt>
  <dd>
    Returns boolean value indicates has specified date and time come. 
    Native <code>Date</code> and <b>ISO8601</b> formats supported.
  </dd>
  
  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/isValidNativeDate.ts">
      <code>isValidNativeDate</code>
    </a>
  </dt>
  <dd>Returns boolean value indicates does specified <code>Date</code> represents the valid date and time.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/millisecondsToSeconds.md">
      <code>millisecondsToSeconds</code>
    </a>
  </dt>
  <dd>Converts milliseconds amount to amount of seconds.</dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/secondsToMilliseconds.md">
      <code>secondsToMilliseconds</code>
    </a>
  </dt>
  <dd>Converts seconds amount to amount of milliseconds.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/TimePoint.md"><code>TimePoint</code></a></dt>
  <dd>
    An alternative of native <code>Date</code> (which actually is not only the Date but also the time).
    <ul>
      <li>
        Has similar API with <code>DateWithoutTime</code>, but it also has the conceptual difference: is 
          <code>DateWithoutTime</code> is the date not associated with specific time zone and does not work with time,
          <code>TimePoint</code> work with time and also has the accusation with specific time zone 
      </li>
      <li>
        The most demanded functionality is <code>format</code> static method allows defining the arbitrary formatting of 
          target date with optimized computing.
      </li>
    </ul>
  </dd>

  <dt>
    <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/%40v1.8/CoreLibrary/Package/Source/DateTime/Timer.ts">
      <code>Timer</code>
    </a>
  </dt>
  <dd>Abstract class indented to be inherited and implemented with environment-dependent functionality.</dd>

</dl>


### Default value Subsituters

Although the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
  makes the below functions redundant, they still could be used in the environments with old ECMAScript versions.

<dl>

  <dt>substituteWhenNull</dt>
  <dd>Substitutes the second argument's value when first one is null.</dd>

  <dt>substituteWhenUndefined</dt>
  <dd>Substitutes the second argument's value when first one is <b>undefined</b>.</dd>

</dl>


#### Errors

<dl>

  <dt><code>AlgorithmMismatchError</code></dt>
  <dd>Intended to be used in general cases when actual behavior does not match with desired.</dd>

  <dt><code>ClassRedundantSubsequentInitializationError</code></dt>
  <dd>Intended to be used when the class developed as singleton has been attempted to initialize twice.</dd>

  <dt><code>ClassRequiredInitializationHasNotBeenExecutedError</code></dt>
  <dd>Intended to be used when the class beside the constructor requires the initialization but the initializing method has not been called.</dd>

  <dt><code>ConfigFileNotFoundError</code></dt>
  <dd>Intended to be used when some utility requires the config file, but it has not been found.</dd>

  <dt><code>CrossBrowserIssueError</code></dt>
  <dd>Intended to be used when some processing could not be executed because of certain browser's limitations.</dd>

  <dt><code>DataRetrievingFailedError</code></dt>
  <dd>Intended to be used when the data retrieving from some external resource (server, database, file, etc.) failed.</dd>

  <dt><code>DataSubmittingFailed</code></dt>
  <dd>Intended to be used when the data submitting to any external resource (server, database, etc.) failed.</dd>

  <dt><code>DOM_ElementRetrievingFailedError</code></dt>
  <dd>
    Intended to used when expected to be existing DOM element has not been retrieved.
    Related not only with browser JavaScript but also with processing of HTML code at server side.
  </dd>

  <dt><code>FileReadingFailedError</code></dt>
  <dd>Intended to be used when the file reading has not gone as expected</dd>

  <dt><code>FileWritingFailedError</code></dt>
  <dd>Intended to be used when the file writing has not gone as expected</dd>

  <dt><code>ImproperUsageError</code></dt>
  <dd>
    Intended to be used when the class/function has been attempted to use improperly. 
    Herewith, try to name the function/methods such as it will be obvious how to use it and also limit the usage by 
      TypeScript typing.
  </dd>

  <dt><code>IncompatiblePropertiesInObjectTypeParameterError</code></dt>
  <dd>
    Intended to be used when in parameter <b>exampleParameter</b> of object type one of properties 
    <b>exampleParameter.propertyA</b> and <b>exampleParameter.propertyB</b> must be omitted but both has been specified.
  </dd>

  <dt><code>InterProcessInteractionFailedError</code></dt>
  <dd>
    Intended to be used when the interaction between NodeJS processed is not going as expected. 
    Could be actual, for example, for the Electron.js where the main process and render process are exchanges by data.
  </dd>

  <dt><code>InvalidConfigError</code></dt>
  <dd>
    Intended to be used when config validation was not passed.
    Appending of the validation errors messages to <b>InvalidConfigError</b>'s message is strongly recommended.
  </dd>

  <dt><code>InvalidExternalDataError</code></dt>
  <dd>
    Intended to be used when the data from the external data source does not match with expected. 
    Appending of the validation errors messages to <b>InvalidExternalDataError</b>'s message is strongly recommended.</dd>

  <dt><code>InvalidParameterValueError</code></dt>
  <dd>
    Intended to be used when the parameter's does not fit to some limitations.
    Although the TypeScript allows to define and check the parameter's type, no type check will not be executed
    once TypeScript will be compiled to JavaScript. Also, is the parameter has limitations like smallest numerical 
    value or maximal characters count, <b>InvalidParameterValueError</b> has been developed for such cases.
  </dd>

  <dt><code>ModuleDynamicLoadingFailedError</code></dt>
  <dd>Recommended to throw when the module dynamical loading failed. Actual for bundlers like Webpack.</dd>

  <dt><code>UnexpectedEventError</code></dt>
  <dd>
    Intended to be used when the probability of the occurrence of some "else if" branch is very small and 
      impossible for normal operation of the program.
  </dd>

  <dt><code>UnsupportedScenarioError</code></dt>
  <dd>Intended to be used when occurred some scenario which is not supported yet.</dd>

</dl>


##### HTTPS

<dl>

  <dt><code>HTTP_ResponseBodyParsingFailureError</code></dt>
  <dd>Intended to be used when HTTP response body has not been parsed successfully.</dd>

</dl>

[//]: # (todo =========================================================================================================&#41;)

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
    If you need to extract this date part from ISO8601 string (not just know the characters count), use <a href="Documentation/DateTime/getISO8601_StringWithoutTimePart.md"><code>getISO8601_StringWithoutTimePart</code></a> function.
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
