# Yamato Daiwa ES Extensions - NodeJS

[![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)]()
[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/es-extensions-nodejs)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions-nodejs)

Additional to [@yamato-daiwa/es-extensions](https://www.npmjs.com/package/@yamato-daiwa/es-extensions) functionality 
for Node.js environment. 

Helper functions and classes aimed to reduce the routine code.
Build-in TypeScript type safety without `any` type.
Oriented to TypeScript users investing the time to quality including type-safety.


## Installation

The minor versions of **@yamato-daiwa/es-extensions-nodejs** and **@yamato-daiwa/es-extensions** must match.

```
npm i @yamato-daiwa/es-extensions-nodejs @yamato-daiwa/es-extensions -E
```


## Functionality
### Utils

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/NodeJS/Package/Documentation/Logging/ConsoleApplicationLogger/ConsoleApplicationLogger.md">ConsoleApplicationLogger</a></dt>
  <dd>The implementation of <b>ILogger</b> interface for <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md">Logger</a> facade and Node.js environment.</dd>

  <dt><a href=https://ee.yamato-daiwa.com/NodeJS/ConsoleCommandsParser/ConsoleCommandsParser.english.html">ConsoleCommandsParser</a></dt>
  <dd>Parsing and validating of CLI commands</dd>

  <dt>isErrnoException</dt>
  <dd>Type guard which checks is value compatible with <b>NodeJS.ErrnoException</b> interface.</dd>

</dl>


### Pre-made errors

<dl>

  <dt>FileNotFoundError</dt>
  <dd>Intended to be thrown when the file which expected to exist was not found.</dd>
  
  <dt>InvalidConsoleCommandError</dt>
  <dd>Intended to be thrown when the inputted console commands does not match with the manual.</dd>
  
</dl>
