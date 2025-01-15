# Yamato-Daiwa ES-Extensions

![Build](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions-intellij_platform_plugin/workflows/Build/badge.svg)
[![Version](https://img.shields.io/jetbrains/plugin/v/17638.svg)](https://plugins.jetbrains.com/plugin/PLUGIN_ID)
[![Downloads](https://img.shields.io/jetbrains/plugin/d/17638.svg)](https://plugins.jetbrains.com/plugin/PLUGIN_ID)

<!-- Plugin description -->

[Live Templates](https://www.jetbrains.com/help/idea/using-live-templates.html) for 
[@yamato-daiwa/es-extensions (**YDEE**)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions#readme) libraries.


* Functions
  * Arrays
    * <kbd>addElementsToArray</kbd>, <kbd>aeta</kbd> The live template and it's alias respectively for the [**addElementsToArray**](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/AddingOfElements/addElementsToArray/addElementsToArray.english.html) function
    * <kbd>getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</kbd> The autocomplete imitator like Live Template for the [eponymous function](CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html)
    * <kbd>getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</kbd> The live template for the [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.md)
    * <kbd>getIndexesOfArrayElementsWhichSatisfies6ThePredicate</kbd> The live template for the [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/getIndexesOfArrayElementsWhichSatisfiesThePredicate/getIndexesOfArrayElementsWhichSatisfiesThePredicate.md)
    * <kbd>getIndexOfArrayElementIfSuchElementIsExactlyOne</kbd> The live template for the [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.md)
    * <kbd>getLastElementOfArray</kbd>, <kbd>gleoa</kbd> The live template and it's alias respectively for the [**getLastElementOfArray**](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/getLastElementOfArray/getLastElementOfArray.english.html) function
    * <kbd>removeArrayElementsByIndexes</kbd>, <kbd>raebi</kbd> The live template and it's alias respectively for [**removeArrayElementsByIndexes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByIndexes/removeArrayElementsByIndexes.md) function
    * <kbd>replaceArrayElementsByIndexesImmutably</kbd>, <kbd>raebii</kbd> The live template and it's alias respectively for [**replaceArrayElementsByIndexesImmutably**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.md) function
    * <kbd>removeArrayElementsByPredicates</kbd>, <kbd>rmaebp</kbd> The live template and it's alias respectively for [**removeArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByPredicates/removeArrayElementsByPredicates.md) function
    * <kbd>replaceArrayElementsByPredicates</kbd>, <kbd>rpaebp</kbd> The live template and it's alias respectively for [**replaceArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.md) function
    * <kbd>twoDimensionalizeArray</kbd>, <kbd>tda</kbd> The live template and it's alias respectively for the [**twoDimensionalizeArray**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/twoDimensionalizeArray.md) function

  * Strings
    * <kbd>rscfcp</kbd> Live template for [removeSpecificCharacterFromCertainPosition](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeSpecificCharacterFromCertainPosition.md) function 
  * BrowserJS
    * <kbd>cdefhc</kbd> Live template for [createDOM_ElementFromHTML_Code](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/createDOM_ElementFromHTML_Code.md) function
    * <kbd>dceh</kbd> Live template for [delegateClickEventHandling](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/delegateClickEventHandling.md) function
    * Without abbreviations (please note that you don't need to type the whole name of the function because even live templates has autocomplete)
      * <kbd>getExpectedToBeSingleDOM_Element</kbd> Inserts the examples of [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/getExpectedToBeSingleDOM_Element.md) usage
      * <kbd>getExpectedToBeSingleChildOfTemplateElement</kbd> Inserts the examples of [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/getExpectedToBeSingleChildOfTemplateElement.md) usage

* [**RawObjectDataProcessor**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#rawobjectdataprocessor)
  * <kbd>prod</kbd> Inserts working example with error handling
  
* Logging
  * <kbd>teal</kbd> Inserts [`Logger.throwErrorAndLog`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#throwerrorandlog-throw-the-error-and-make-log) calling expression
  * <kbd>le</kbd> Inserts [`Logger.logError`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logerror-error-logging-without-throwing) calling expression
  * <kbd>lelm</kbd> Inserts [`Logger.logErrorLikeMessage`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logerrorlikemessage-logging-of-the-message-with-error-highlight-and-to-errors-stream) calling expression
  * <kbd>lw</kbd> Inserts [`Logger.warning`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logwarning-logging-of-the-warnings) calling expression
  * <kbd>li</kbd> Inserts [`Logger.logInfo`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#loginfo-logging-of-the-other-messages) calling expression
  * <kbd>ls</kbd> Inserts [`Logger.logSuccess`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logsuccess-logging-of-the-success-message) calling expression
  
* Date and time
  * <kbd>tp</kbd> Inserts working example of the [TimePoint](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/TimePoint.md) class usage

* BrowserJS
  * <kbd>addLeftClickEventHandler</kbd>, <kbd>alceh</kbd> The live template and it's alias respectively for the [**addLeftClickEventHandler**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/EventsHandling/addLeftClickEventHandler.md) function
  * <kbd>cloneDOM_Element</kbd> The live template for the [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/cloneDOM_Element.md)

<!-- Plugin description end -->


## Installation

- Using IDE built-in plugin system:
  
  <kbd>Settings/Preferences</kbd> > <kbd>Plugins</kbd> > <kbd>Marketplace</kbd> > <kbd>Search for "yamato_daiwa-es_extensions-intellij_platform_plugin"</kbd> >
  <kbd>Install Plugin</kbd>
  
- Manually:

  Download the [latest release](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions-intellij_platform_plugin/releases/latest) and install it manually using
  <kbd>Settings/Preferences</kbd> > <kbd>Plugins</kbd> > <kbd>⚙️</kbd> > <kbd>Install plugin from disk...</kbd>


---
Plugin based on the [IntelliJ Platform Plugin Template][template].

[template]: https://github.com/JetBrains/intellij-platform-plugin-template
