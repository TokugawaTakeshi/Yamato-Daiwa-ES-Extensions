# @yamato-daiwa/es-extensions-browserjs

[![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)]()
[![No third-party dependencies](https://img.shields.io/badge/Dependencies-No_third_party_dependencies-brightgreen.svg?style=flat)]()
[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/es-extensions-browserjs)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions-browserjs)

Additional to [@yamato-daiwa/es-extensions](https://www.npmjs.com/package/@yamato-daiwa/es-extensions) functionality 
for browser environment. 

Helper functions and classes aimed to reduce the routine code. 
Build-in TypeScript type safety without `any` type.


## Installation

```
npm i @yamato-daiwa/es-extensions-browserjs @yamato-daiwa/es-extensions -E
```


## Documentation
#### Functionality reference

### DOM manipulation

* [**createDOM_ElementFromHTML_Code**](Documentation/DOM/createDOM_ElementFromHTML_Code.md) Creates the DOM element 
  ([Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)) or it's inheritor from HTML code, herewith is must  
  be exactly one root element.
* [**createHTML_CollectionFromHTML_Code**](Documentation/DOM/createHTML_CollectionFromHTML_Code.md) Creates the 
  [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) from HTML code passed as parameter.

#### Events handling

* [**delegateClickEventHandling**](Documentation/DOM/delegateClickEventHandling.md) Create just one click event listener
  while allowing to handle the click on arbitrary large number of elements what is the optimization measures.


### Logging

* [📖 `BasicFrontEndLogger`](Documentation/Logging/BasicFrontEndLogger/BasicFrontEndLogger.md)
  The implementation of `ILogger` interface for the `Logger` facade which could be used as the base of the custom implementation
  for the frontend side of the websites / web application.
