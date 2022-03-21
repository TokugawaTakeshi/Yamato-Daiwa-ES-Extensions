# @yamato-daiwa/es-extensions-nodejs

[![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)]()
[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/es-extensions-nodejs)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions-nodejs)

Additional to [@yamato-daiwa/es-extensions](https://www.npmjs.com/package/@yamato-daiwa/es-extensions) functionality 
for Node.js environment. Helper functions and classes aimed to reduce the routine code. 
Build-in TypeScript type safety without `any` type.


## Installation

```
npm i @yamato-daiwa/es-extensions-nodejs @yamato-daiwa/es-extensions -E
```

## Functionality

* [📖 **ConsoleCommandsParser**](Documentation/ConsoleCommandsParser/ConsoleCommandsParser.md) Parsing and validating of CLI commands.
* [📖 **ConsoleApplicationLogger**](Documentation/Logging/ConsoleApplicationLogger/ConsoleApplicationLogger.md) The implementation of 
  **ILogger** interface for Node.js environment.
* Errors
  * **InvalidConsoleCommandError** - intended to be thrown the inputted console command does not satisfy to valid schema.
