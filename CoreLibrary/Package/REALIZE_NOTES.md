## New functionality
### Functions
#### Arrays
##### Replacing of elements

* [📖 **replaceArrayElementsByIndexesImmutably**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.md)
  Creates the copy of target array and replaces the elements by specified indexes.
* [📖 **replaceArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.md)
  Replaces array elements by one or more predicates, herewith the replacing could be mutable or not depending on dedicated property of named parameters object.

##### Removing of elements

* [📖 **removeArrayElementsByIndexes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByIndexes/removeArrayElementsByIndexes.md)
  Removes array elements by indexes, herewith the removing could be mutable or not depending on dedicated property of named parameters object.
* [📖 **removeArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByPredicates/removeArrayElementsByPredicates.md)
  Removes array elements by one or more predicates, herewith the removing could be mutable or not depending on dedicated property of named parameters object.


## Breaking changes

* The function **getArrayElementMatchingWithPredicateIfSuchElementExactlyOne** has been renamed to 
  **getArrayElementMatchingWithPredicateIfSuchElementIsExactlyOne** ("is" has been added)
  * Reason: grammatical issue
  * Migration: replacing to new name only.
* The function **getIndexOfArrayElementByPredicate** has been renamed to **getIndexOfArrayElementIfSuchElementIsExactlyOne**
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
