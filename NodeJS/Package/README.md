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

  <dt><a href="Documentation/ConsoleCommandsParser/ConsoleCommandsParser.md">ConsoleCommandsParser</a></dt>
  <dd>Parsing and validating of CLI commands.</dd>

  <dt><a href="Documentation/Logging/ConsoleApplicationLogger/ConsoleApplicationLogger.md">ConsoleApplicationLogger</a></dt>
  <dd>The implementation of <b>ILogger</b> interface for <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md">Logger</a> facade and Node.js environment.</dd>

  <dt>isErrnoException</dt>
  <dd>Type guard which checks is value compatible with <b>NodeJS.ErrnoException</b> interface.</dd>

</dl>


### Pre-made errors

<dl>

  <dt>InterProcessInteractionFailedError</dt>
  <dd>
    Intended to be used when the interaction between NodeJS processed is not going as expected. 
    Could be actual for the Electron.js where the main process and render process exchanging by data.
  </dd>

  <dt>InvalidConsoleCommandError</dt>
  <dd>Intended to be thrown the inputted console command does not satisfy to valid schema.</dd>
  
</dl>
