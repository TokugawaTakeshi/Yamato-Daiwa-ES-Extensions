# Yamato-Daiwa ES-Extensions

![Build](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions-intellij_platform_plugin/workflows/Build/badge.svg)
[![Version](https://img.shields.io/jetbrains/plugin/v/17638.svg)](https://plugins.jetbrains.com/plugin/PLUGIN_ID)
[![Downloads](https://img.shields.io/jetbrains/plugin/d/17638.svg)](https://plugins.jetbrains.com/plugin/PLUGIN_ID)

<!-- Plugin description -->

Adds [Live Templates](https://www.jetbrains.com/help/idea/using-live-templates.html) for 
[@yamato-daiwa/es-extensions](https://www.npmjs.com/package/@yamato-daiwa/es-extensions) library.

Currently, below live templates are available:

* Logging
  * `teal` : [`Logger.throwErrorAndLog`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#throwerrorandlog-throw-the-error-and-make-log)
  * `le`: [`Logger.logError`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logerror-error-logging-without-throwing)
  * `lelm`: [`Logger.logErrorLikeMessage`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logerrorlikemessage-logging-of-the-message-with-error-highlight-and-to-errors-stream)
  * `lw`: [`Logger.warning`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logwarning-logging-of-the-warnings)
  * `li`: [`Logger.logInfo`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#loginfo-logging-of-the-other-messages)
  * `ls`: [`Logger.logSuccess`](https://github.com/TokugawaTakeshi/yamato_daiwa-es_extensions/blob/master/Documentation/Logging/Logger/Logger.md#logsuccess-logging-of-the-success-message)
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
