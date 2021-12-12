# @yamato-daiwa/es-extensions-browserjs

[![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)]()
[![No dependencies](https://img.shields.io/badge/Dependencies-No_dependencies-brightgreen.svg?style=flat)]()
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

### Logging

* [📖 `BasicFrontEndLogger`](Documentation/Logging/BasicFrontEndLogger/BasicFrontEndLogger.md)
  The implementation of `ILogger` interface for the `Logger` facade which could be used as the base of the custom implementation
  for the frontend side of the websites / web application.


#### Comparison with `jQuery` and native

Please note that below comparison is actual for TypeScript with the strictest configuration because one of important
`@yamato-daiwa/es-extensions-browserjs`'s goals is type-safe adaptation for TypeScript.

<table>
  <thead>
    <th></th>
    <th>Native solution</th>
    <th>jQuery</th>
    <th>@yamato-daiwa/es-extensions-browserjs</th>
  </thead>
  <tbody>
    <tr>
      <th> Get 1 element </th>
      <td> 
        <code>document.querySelector&lt;ElementInheritor&gt;(".TargetElement")</code>
        <ul>
          <li>Returns <code>null</code> if target element doest not exist.</li>
          <li>No guarantee that picked element is actually instance of <code>ElementInheritor</code>. </li>
        </ul>
      </td>
      <td>
        <code>$&lt;ElementInheritor&gt;(".TargetElement")</code>
        <ul>
          <li>Empty JQuery collection will be returned if target element doest not exist.</li>
          <li>No guarantee that picked element is actually instance of <code>ElementInheritor</code>. </li>
        </ul>
      </td>
      <td>
        <code>
          getExpectedToBeSingleElement({ 
            selector: ".TargetElement", 
            elementTypeChecker: (element: Element): boolean => element instanceof ElementInheritor
          })
        </code>
        <ul>
          <li>Throws the error if element not found or found more than 2 elements.</li>
          <li>
            <code>elementTypeChecker</code> guarantee that picked element is the instance of <code>ElementInheritor</code>.
            If <code>elementTypeChecker</code> has not been specified, the plain <code>elementTypeChecker</code> will be returned.
          </li>
          <p> <b>Hint</b> Use <b>getbse</b> Live template live template for quick input when you are working from IntelliJ IDEA family IDE. </p>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
