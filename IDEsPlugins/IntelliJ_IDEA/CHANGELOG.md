<!-- Keep a Changelog guide -> https://keepachangelog.com -->

# yamato_daiwa-es_extensions-intellij_platform_plugin Changelog

## [0.0.8]

### Changed

* Support IntelliJ IDEA platform until **2024.2.1**
* Update <kbd>getExpectedToBeSingleChildOfTemplateElement</kbd> live template according to v1.7.X API.
* Update <kbd>getExpectedToBeSingleDOM_Element</kbd> live template to v1.7.X API.

## [0.0.8]

### Changed

* Support IntelliJ IDEA platform until **2023.4.2**

### Deleted

* Drop support forIntelliJ IDEA platform **>2023.1**


## [0.0.7]

### Changed

* Support IntelliJ IDEA platform 2023.2-2023.3.


## [0.0.6]

### Added

* Add <kbd>createDOM_ElementFromHTML_Code</kbd> live template.
* Add <kbd>delegateClickEventHandling</kbd> live template.

### Changed

* Support IntelliJ Platform **2023.2**
* Update <kbd>addElementsToArray</kbd> live template <kbd>aeta</kbd>.
* Update <kbd>getExpectedToBeSingleChildOfTemplateElement</kbd> live template.
* Update <kbd>getExpectedToBeSingleDOM_Element</kbd> live template.
* Fixed mistakes and improve <kbd>getLastElementOfArray</kbd>, <kbd>gleoa</kbd> - The live template and it's alias respectively for the [`getLastElementOfArray`](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/getLastElementOfArray/getLastElementOfArray.english.html) function


### Removed

* <kbd>cdefhc</kbd> has been renamed to <kbd>createDOM_ElementFromHTML_Code</kbd>.
* <kbd>dceh</kbd> has been renamed to <kbd>delegateClickEventHandling</kbd>.


## [0.0.5]

### Added

* <kbd>addElementsToArray</kbd> The copy of the live template for [<kbd>aeta</kbd>](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/addElementsToArray/addElementsToArray.english.html).
  From this version, the <kbd>aeta</kbd> is the alias for <kbd>addElementsToArray</kbd>.
* <kbd>getIndexesOfArrayElementsWhichSatisfiesThePredicate</kbd> - The live template for the [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/getIndexesOfArrayElementsWhichSatisfiesThePredicate/getIndexesOfArrayElementsWhichSatisfiesThePredicate.md)
* <kbd>getLastElementOfArray</kbd>, <kbd>gleoa</kbd> - The live template and it's alias respectively for the [`getLastElementOfArray`](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/getLastElementOfArray/getLastElementOfArray.english.html) function
* <kbd>removeArrayElementsByIndexes</kbd> The copy of the live template for [<kbd>raebi</kbd>](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByIndexes/removeArrayElementsByIndexes.md).
  From this version, the <kbd>raebi</kbd> is the alias for <kbd>removeArrayElementsByIndexes</kbd>.
* <kbd>replaceArrayElementsByIndexesImmutably</kbd> The copy of the live template for [<kbd>raebii</kbd>](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.md).
  From this version, the <kbd>raebii</kbd> is the alias for <kbd>replaceArrayElementsByIndexesImmutably</kbd>.
* <kbd>removeArrayElementsByPredicates</kbd> - The copy of the live template for [<kbd>rmaebp</kbd>](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByPredicates/removeArrayElementsByPredicates.md).
  From this version, the <kbd>rmaebp</kbd> is the alias for <kbd>removeArrayElementsByPredicates</kbd>.
* <kbd>replaceArrayElementsByPredicates</kbd> The copy of the live template for [<kbd>rpaebp</kbd>](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.md).
  From this version, the <kbd>rpaebp</kbd> is the alias for <kbd>replaceArrayElementsByPredicates</kbd>.
* <kbd>twoDimensionalizeArray</kbd>, <kbd>tda</kbd> The live template and it's alias respectively for the [`twoDimensionalizeArray`](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/addElementsToArray/addElementsToArray.english.html) function

### Changed

* Drop the support for IntelliJ IDEA 2021.X
* <kbd>getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</kbd>: Has been updated for **@yamato-daiwa/es-extensions** of version **1.6.x**.
* <kbd>getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</kbd>: Has been updated for **@yamato-daiwa/es-extensions** of version **1.6.x**.


## [0.0.3]

### Added

* <kbd>aeta</kbd> Live template for [**addElementsToArray**](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/addElementsToArray/addElementsToArray.english.html) function
* <kbd>cdefhc</kbd> Live template for [createDOM_ElementFromHTML_Code](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/createDOM_ElementFromHTML_Code.md) function
* <kbd>dceh</kbd> Live template for [delegateClickEventHandling](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/delegateClickEventHandling.md) function
* <kbd>getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</kbd> Inserts working examples of usage of [eponymous function](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html)
* <kbd>getExpectedToBeSingleChildOfTemplateElement</kbd> Inserts the examples of [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/getExpectedToBeSingleChildOfTemplateElement.md) usage
* <kbd>getExpectedToBeSingleDOM_Element</kbd> Inserts the examples of [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/getExpectedToBeSingleDOM_Element.md) usage
* <kbd>getIndexOfArrayElementIfSuchElementIsExactlyOne</kbd> Live template for  [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.md)
* <kbd>getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</kbd> Live template for  [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.md)
* <kbd>raebi</kbd> Live template for [**removeArrayElementsByIndexes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByIndexes/removeArrayElementsByIndexes.md) function
* <kbd>raebii</kbd> Live template for [**replaceArrayElementsByIndexesImmutably**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.md) function
* <kbd>rmaebp</kbd> Live template for [**removeArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByPredicates/removeArrayElementsByPredicates.md) function
* <kbd>rpaebp</kbd> Live template for [**replaceArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.md) function
* <kbd>rscfcp</kbd> Live template for [removeSpecificCharacterFromCertainPosition](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeSpecificCharacterFromCertainPosition.md) function
* <kbd>tp</kbd> Inserts working example of the [TimePoint](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/TimePoint.md) class usage

### Changed

* Support for build **2022.X**
* Drop support for build **2020.X**
* Live template <kbd>prod</kbd> has been renamed to <kbd>rodp</kbd>


## [0.0.2]

### Added

* [`prod`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#rawobjectdataprocessor)
  Working example with error handling for `RawObjectDataProcessor`
