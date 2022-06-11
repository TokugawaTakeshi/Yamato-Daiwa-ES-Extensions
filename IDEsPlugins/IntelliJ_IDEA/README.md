# Yamato-Daiwa ES-Extensions

![Build](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions-intellij_platform_plugin/workflows/Build/badge.svg)
[![Version](https://img.shields.io/jetbrains/plugin/v/17638.svg)](https://plugins.jetbrains.com/plugin/PLUGIN_ID)
[![Downloads](https://img.shields.io/jetbrains/plugin/d/17638.svg)](https://plugins.jetbrains.com/plugin/PLUGIN_ID)

<!-- Plugin description -->

[Live Templates](https://www.jetbrains.com/help/idea/using-live-templates.html) for 
[@yamato-daiwa/es-extensions (**YDEE**)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions) library.

* Functions
  * Arrays
    * <kbd>aeta</kbd> - live template for [**addElementsToArray**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/addElementsToArray/addElementsToArray.md) function
    * <kbd>raebi</kbd> - live template for [**removeArrayElementsByIndexes**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByIndexes/removeArrayElementsByIndexes.md) function
    * <kbd>raebii</kbd> - live template for [**replaceArrayElementsByIndexesImmutably**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.md) function
    * <kbd>rmaebp</kbd> - live template for [**removeArrayElementsByPredicates**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/removeArrayElementsByPredicates/removeArrayElementsByPredicates.md) function
    * Without abbreviations (please note that you don't need to type the whole name of the function because even live template has aucomplete)
      * <kbd>getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</kbd> - inserts working examples of usage of [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Arrays/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.md)
      * <kbd>getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne</kbd> - live template for  [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.md)
      * <kbd>getIndexOfArrayElementIfSuchElementIsExactlyOne</kbd> - live template for  [eponymous function](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/tree/master/CoreLibrary/Package/Documentation/Arrays/getIndexOfArrayElementIfSuchElementIsExactlyOne/getIndexOfArrayElementIfSuchElementIsExactlyOne.md)
  * BrowserJS
    * <kbd>cdefhc</kbd> - live template for [createDOM_ElementFromHTML_Code](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DOM/createDOM_ElementFromHTML_Code.md) function
    * <kbd>dceh</kbd> - live template for [delegateClickEventHandling](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DOM/delegateClickEventHandling.md) function

* [**RawObjectDataProcessor**](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#rawobjectdataprocessor)
  * <kbd>prod</kbd>: working example with error handling
  
* Logging
  * <kbd>teal</kbd> - [`Logger.throwErrorAndLog`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#throwerrorandlog-throw-the-error-and-make-log)
  * <kbd>le</kbd> - [`Logger.logError`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logerror-error-logging-without-throwing)
  * <kbd>lelm</kbd> - [`Logger.logErrorLikeMessage`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logerrorlikemessage-logging-of-the-message-with-error-highlight-and-to-errors-stream)
  * <kbd>lw</kbd> - [`Logger.warning`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logwarning-logging-of-the-warnings)
  * <kbd>li</kbd> - [`Logger.logInfo`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#loginfo-logging-of-the-other-messages)
  * <kbd>ls</kbd> - [`Logger.logSuccess`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logsuccess-logging-of-the-success-message)
* Date and time
  * <kbd>tp</kbd> - working example of the [TimePoint](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/DateTime/TimePoint.md) class usage.

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
