## New functionality
### Functions
#### Arrays

* [📖 **removeArrayElementsByIndexes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByIndexes/removeArrayElementsByIndexes.md)
  Removes array elements by indexes, herewith the removing could be mutable or not depending on dedicated property of compound parameter.
* [📖 **removeArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByPredicates/removeArrayElementsByPredicates.md)
  Removes array elements by one or more predicates, herewith the removing could be mutable or not depending on dedicated property of compound parameter.


## Breaking changes

* The function **InvalidParameterValueError.Localization.genericDescriptionPartTemplate** has been renamed to
  **generateMessage**. 
  * Reason: wrong name of function has been selected.  
  * Migration: Required only if you created the new localization of **InvalidParameterValueError**. Will be done by
    changing the key of dedicated property.
