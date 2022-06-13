## Core package
### New functionality
#### Functions
##### Arrays
###### Replacing of elements

* [📖 **replaceArrayElementsByIndexesImmutably**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.md)
  Creates the copy of target array and replaces the elements by specified indexes.
* [📖 **replaceArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.md)
  Replaces array elements by one or more predicates, herewith the replacing could be mutable or not depending on dedicated property of named parameters object.

###### Adding of elements

* [📖 **addElementsToArray**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/addElementsToArray/addElementsToArray.md)
  Adds one or more elements to the start, end or specified position of target array, herewith the adding could be mutable or not depending on dedicated property of named parameters object.


###### Removing of elements

* [📖 **removeArrayElementsByIndexes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByIndexes/removeArrayElementsByIndexes.md)
  Removes array elements by indexes, herewith the removing could be mutable or not depending on dedicated property of named parameters object.
* [📖 **removeArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByPredicates/removeArrayElementsByPredicates.md)
  Removes array elements by one or more predicates, herewith the removing could be mutable or not depending on dedicated property of named parameters object.


##### Date and time

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getNextMonthNumber.md">getNextMonthNumber</a></dt>
  <dd>Returns next month number in relation to specified year and month number; numeration from 0 and 1 is available for both parameter and returned value.</dd>
  
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getPreviousMonthNumber.md">getPreviousMonthNumber</a></dt>
  <dd>Returns previous month number in relation to specified year and month number; numeration from 0 and 1 is available for both parameter and returned value.</dd>
  
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getYearOfNextMonth.md">getYearOfNextMonth</a></dt>
  <dd>Returns the year of next month in relation to specified year and month.</dd>
  
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/getYearOfPreviousMonth.md">getYearOfPreviousMonth</a></dt>
  <dd>Returns the year of previous month in relation to specified year and month.</dd>
</dl>

##### Pre-validation modifiers for RawObjectDataProcessor

* **convertPotentialStringToFloatIfPossible** - Tries to convert the string to float; returns the number in success case otherwise the initial value.
* **convertPotentialStringToIntegerIfPossible** - Tries to convert the string to integer; returns the number in success case otherwise the initial value.
* **convertPotentialStringToNumberIfPossible** - Tries to convert the string to integer or float (depending on decimal part separator presence); returns the number in success case otherwise the initial value.


#### Constants and enumerations

* **HOURS_PER_STELLAR_DAY** - Has value **24**; intended to be used to avoid the magic numbers in computings.
* **MINUTES_PER_HOUR** - Has value **60**; intended to be used to avoid the magic numbers in computings.
* **SECONDS_PER_MINUTE** - Has value **60**; intended to be used to avoid the magic numbers in computings.
* **MONTHS_PER_YEAR** - Has value **12**; intended to be used to avoid the magic numbers in computings.


##### Errors

All **localization** static fields of each pre-made error are public now.


#### Type guards

* **isEitherUndefinedOrNull**

### Breaking changes

* The function **getArrayElementMatchingWithPredicateIfSuchElementExactlyOne** has been renamed to 
  **getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne**
  * Reason: grammatical issue with "is" auxiliary verb and unification of "matching with predicate" and "satisfies the predicate"
    to second one.
  * Migration: replacing to new name only.
* The function **getIndexesOfArrayElementsWhichSatisfiesToPredicate** has been renamed to
  **getIndexesOfArrayElementsWhichSatisfiesThePredicate**
  * Reason: idiomatic issue ("satisfies the N" is more correct than "satisfies to N")
  * Migration: replacing to new name only.
* The function **getIndexOfArrayElementByPredicate** has been renamed to **getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne**
  and upgraded.
  * Reason: native analogue [**Array.prototype.findIndex**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
  * Migration
    1. Specify option **throwErrorIfElementNotFoundOrMoreThan1** at third parameter with boolean value.
       For the `false` case, no error handling required.
    2. Make sure that all arrays using this function are expected to not have subsequent elements matching with
       specified predicate - if array has more than one such elements, the index will not be returned anymore
       (if you are can not accept this behaviour, is means you need native **Array.prototype.findIndex**).
* The function **InvalidParameterValueError.Localization.genericDescriptionPartTemplate** has been renamed to
  **generateMessage**. 
  * Reason: wrong name of function has been selected.  
  * Migration: Required only if you created the new localization of **InvalidParameterValueError**. Will be done by
    changing the key of dedicated property.
* The public static getter **DEFAULT_TITLE** has been removed from each pre-made error.
  * Reason: the default title could be retrieved as `ErrorClass.localization.defaultTitle` now.
  * Migration: replace `ErrorClass.DEFAULT_TITLE` to `ErrorClass.localization.defaultTitle`.
* Fixed typo in property **numerationFrom** of object-type parameter of **getMonthNameByNumber**.


## Node.js package
### New functionality

* [**ConsoleApplicationLogger**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/Documentation/Logging/ConsoleApplicationLogger/ConsoleApplicationLogger.md)
  Provides Node.js environment compatible formatting for the **Logger** class.

* [**ConsoleCommandsParser**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/NodeJS/Package/Documentation/ConsoleCommandsParser/ConsoleCommandsParser.md)
  Provides parsing and validation of the console commands.

* **InvalidConsoleCommandError** Intended to be thrown the inputted console command does not satisfy to valid schema.
* **isErrnoException** Type guard which checks is value compatible with **NodeJS.ErrnoException** interface.


## Browser.js package

### Functions

* [**createDOM_ElementFromHTML_Code**]($$$/Documentation/DOM/createDOM_ElementFromHTML_Code.md) Creates the DOM element
  ([Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)) or it's inheritor from HTML code, herewith is must  
  be exactly one root element.
* [**createHTML_CollectionFromHTML_Code**]($$$/Documentation/DOM/createHTML_CollectionFromHTML_Code.md) Creates the
  [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) from HTML code passed as parameter.
* [**delegateClickEventHandling**]($$$/Documentation/DOM/delegateClickEventHandling.md) Create just one click event listener
  while allowing to handle the click on arbitrary large number of elements what is the optimization measures.
