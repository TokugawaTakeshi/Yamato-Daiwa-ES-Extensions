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

### DOM manipulations

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/cloneDOM_Element.md">cloneDOM_Element</a></dt>
  <dd>
    Clones DOM element herewith tells TypeScript that cloned element has same subtype of the 
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element">Element</a> as initial instance 
    (it is natural, however the TypeScript typing for the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode">`Node.cloneNode()`</a> 
    has <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node">Node</a> as returned value type; 
    it is the <a href="https://github.com/microsoft/TypeScript/issues/283">TypeScript issue</a>.
  </dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/createDOM_ElementFromHTML_Code.md">createDOM_ElementFromHTML_Code</a></dt>
  <dd>Creates the DOM element (<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element">Element</a>) or it's inheritor from HTML code, herewith it must be exactly one root element.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/createHTML_CollectionFromHTML_Code.md">createHTML_CollectionFromHTML_Code</a></dt>
  <dd>Creates the <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection">HTMLCollection</a> from HTML code passed as parameter.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/getExpectedToBeSingleChildOfTemplateElement.md">getExpectedToBeSingleChildOfTemplateElement</a></dt>
  <dd>Retrieves the child (of <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element">Element</a> type or specified subtype) of <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template">template element</a> if this child is exactly one, otherwise throws the error.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/DOM/getExpectedToBeSingleDOM_Element.md">getExpectedToBeSingleDOM_Element</a></dt>
  <dd>Retrieves the element corresponding to specified selector if this element presents in single instance inside specific context, otherwise throws the error.</dd>
  
</dl>


### Events handling

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/EventsHandling/addLeftClickEventHandler.md">addLeftClickEventHandler</a></dt>
  <dd>
    Adds on mouse left click event handler. 
    The main difference with native analogues is <code>addLeftClickEventHandler</code> provides the instance of 
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent">MouseEvent</a>, 
      not <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event">generic <code>Event</code></a> 
      that is critical for TypeScript.
  </dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/EventsHandling/delegateClickEventHandling.ts.md">delegateClickEventHandling</a></dt>
  <dd>Creates just one click event listener while allowing to handle the click of arbitrary large number of elements what is the optimization measures.</dd>

</dl>


### Logging

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/BrowserJS/Package/Documentation/Logging/BasicFrontEndLogger/BasicFrontEndLogger.md">BasicFrontEndLogger</a></dt>
  <dd>The implementation of <b>ILogger</b> interface for the <a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Logging/Logger/Logger.md"><b>Logger</b> facade</a> which could be used as the base of the custom implementation for the frontend side of the websites / web application.</dd>
</dl>
