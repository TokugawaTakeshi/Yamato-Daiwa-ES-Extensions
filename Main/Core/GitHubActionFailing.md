# BrowserJS

Run cd BrowserJS/Core && npm run "Check Types"

> @yamato-daiwa/es-extensions-browserjs@1.10.0-alpha.2 Check Types
> tsc --noEmit

Error: Source/DOM/createDOM_ElementFromHTML_Code.ts(7,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/DOM/createDOM_ElementFromHTML_Code.ts(29,5): error TS2322: Type 'string | Readonly<{ HTML_Code: string; rootDOM_ElementSubtype?: (new () => DOM_ElementSubtype) | undefined; }>' is not assignable to type 'string'.
  Type 'Readonly<{ HTML_Code: string; rootDOM_ElementSubtype?: (new () => DOM_ElementSubtype) | undefined; }>' is not assignable to type 'string'.
Error: Source/DOM/createDOM_ElementFromHTML_Code.ts(31,35): error TS2339: Property 'HTML_Code' does not exist on type 'string | Readonly<{ HTML_Code: string; rootDOM_ElementSubtype?: (new () => DOM_ElementSubtype) | undefined; }>'.
  Property 'HTML_Code' does not exist on type 'string'.
Error: Source/DOM/createDOM_ElementFromHTML_Code.ts(32,48): error TS2339: Property 'rootDOM_ElementSubtype' does not exist on type 'string | Readonly<{ HTML_Code: string; rootDOM_ElementSubtype?: (new () => DOM_ElementSubtype) | undefined; }>'.
  Property 'rootDOM_ElementSubtype' does not exist on type 'string'.
Error: Source/DOM/createDOM_ElementFromHTML_Code.ts(70,36): error TS2359: The right-hand side of an 'instanceof' expression must be either of type 'any', a class, function, or other type assignable to the 'Function' interface type, or an object type with a 'Symbol.hasInstance' method.
Error: Source/DOM/createDOM_ElementFromHTML_Code.ts(73,84): error TS18048: 'RootDOM_ElementSubtype' is possibly 'undefined'.
Error: Source/DOM/extractAndValidateDatasetFromDOM_Element.ts(7,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/DOM/extractAndValidateDatasetFromDOM_Element.ts(39,23): error TS2339: Property 'dataset' does not exist on type 'Element'.
Error: Source/DOM/extractAndValidateDatasetFromDOM_Element.ts(74,32): error TS2339: Property 'dataset' does not exist on type 'Element'.
Error: Source/DOM/getExpectedToBeSingleChildOfTemplateElement.ts(7,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/DOM/getExpectedToBeSingleChildOfTemplateElement.ts(109,47): error TS2359: The right-hand side of an 'instanceof' expression must be either of type 'any', a class, function, or other type assignable to the 'Function' interface type, or an object type with a 'Symbol.hasInstance' method.
Error: Source/DOM/getExpectedToBeSingleChildOfTemplateElement.ts(116,13): error TS18048: 'compoundParameter.expectedChildElementSubtype' is possibly 'undefined'.
Error: Source/DOM/getExpectedToBeSingleChildOfTemplateElement.ts(125,33): error TS2345: Argument of type 'Node | undefined' is not assignable to parameter of type 'string | Node'.
  Type 'undefined' is not assignable to type 'string | Node'.
Error: Source/DOM/getExpectedToBeSingleDOM_Element.ts(7,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/DOM/getExpectedToBeSingleDOM_Element.ts(38,28): error TS18049: 'compoundParameter.contextElement' is possibly 'null' or 'undefined'.
Error: Source/DOM/getExpectedToBeSingleDOM_Element.ts(71,5): error TS2322: Type 'ParentNode | null | undefined' is not assignable to type 'ParentNode'.
  Type 'undefined' is not assignable to type 'ParentNode'.
Error: Source/DOM/getExpectedToBeSingleDOM_Element.ts(108,34): error TS2359: The right-hand side of an 'instanceof' expression must be either of type 'any', a class, function, or other type assignable to the 'Function' interface type, or an object type with a 'Symbol.hasInstance' method.
Error: Source/DOM/getExpectedToBeSingleDOM_Element.ts(112,18): error TS18048: 'compoundParameter.expectedDOM_ElementSubtype' is possibly 'undefined'.
Error: Source/DOM/resolveContextDOM_ElementPolymorphicSpecification.ts(2,29): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/DOM/resolveContextDOM_ElementPolymorphicSpecification.ts(14,21): error TS18048: 'contextElement' is possibly 'undefined'.
Error: Source/DOM/resolveContextDOM_ElementPolymorphicSpecification.ts(19,3): error TS2322: Type 'ParentNode | undefined' is not assignable to type 'ParentNode | null'.
  Type 'undefined' is not assignable to type 'ParentNode | null'.
Error: Source/DOM/setHTML_Attributes.ts(1,26): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/DOM/setHTML_Attributes.ts(11,7): error TS2345: Argument of type 'string | number' is not assignable to parameter of type 'string'.
  Type 'number' is not assignable to type 'string'.
Error: Source/DateTime/BrowserJS_Timer.ts(6,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/DateTime/BrowserJS_Timer.ts(12,31): error TS2339: Property 'period__seconds' does not exist on type 'BrowserJS_Timer'.
Error: Source/DateTime/BrowserJS_Timer.ts(57,22): error TS2339: Property 'mustStop' does not exist on type 'BrowserJS_Timer'.
Error: Source/DateTime/BrowserJS_Timer.ts(74,40): error TS2339: Property 'period__seconds' does not exist on type 'BrowserJS_Timer'.
Error: Source/DateTime/BrowserJS_Timer.ts(94,56): error TS2339: Property 'onElapsed' does not exist on type 'BrowserJS_Timer'.
Error: Source/DateTime/BrowserJS_Timer.ts(127,30): error TS2339: Property 'period__seconds' does not exist on type 'BrowserJS_Timer'.
Error: Source/EventsHandling/FocusOutEventListener.ts(6,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/EventsHandling/FocusOutEventListener.ts(63,32): error TS18048: 'contextElement' is possibly 'undefined'.
Error: Source/EventsHandling/FocusOutEventListener.ts(69,37): error TS18048: 'contextElement' is possibly 'undefined'.
Error: Source/EventsHandling/InputEventListener.ts(6,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/EventsHandling/InputEventListener.ts(63,32): error TS18048: 'contextElement' is possibly 'undefined'.
Error: Source/EventsHandling/InputEventListener.ts(69,37): error TS18048: 'contextElement' is possibly 'undefined'.
Error: Source/EventsHandling/LeftClick/DelegatedLeftClickEventListener.ts(10,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/EventsHandling/LeftClick/DelegatedLeftClickEventListener.ts(68,32): error TS18048: 'initializationProperties.contextElement' is possibly 'undefined'.
Error: Source/EventsHandling/LeftClick/DelegatedLeftClickEventListener.ts(103,9): error TS2322: Type 'ParentNode | undefined' is not assignable to type 'ParentNode'.
  Type 'undefined' is not assignable to type 'ParentNode'.
Error: Source/EventsHandling/LeftClick/DelegatedLeftClickEventListener.ts(214,23): error TS18047: 'parentElement' is possibly 'null'.
Error: Source/EventsHandling/LeftClick/DelegatedLeftClickEventListener.ts(219,13): error TS18047: 'parentElement' is possibly 'null'.
Error: Source/EventsHandling/LeftClick/DelegatedLeftClickEventListener.ts(220,33): error TS2345: Argument of type 'Element | null' is not assignable to parameter of type 'Element'.
  Type 'null' is not assignable to type 'Element'.
Error: Source/EventsHandling/LeftClick/LeftClickEventListener.ts(6,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Source/EventsHandling/LeftClick/LeftClickEventListener.ts(66,32): error TS18048: 'contextElement' is possibly 'undefined'.
Error: Source/EventsHandling/LeftClick/LeftClickEventListener.ts(72,37): error TS18048: 'contextElement' is possibly 'undefined'.
Error: Source/Logging/BasicFrontEndLogger.ts(19,8): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Tests/Automated/DOM/createDOM_ElementFromHTML_Code.test.ts(7,72): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Tests/Automated/DOM/getExpectedToBeSingleChildOfTemplateElement.test.ts(8,24): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Tests/Automated/DOM/getExpectedToBeSingleDOM_Element.test.ts(8,80): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Tests/Manual/BrowserJS_Timer.test.ts(1,46): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Tests/Manual/BrowserJS_Timer.test.ts(2,28): error TS2307: Cannot find module '@yamato-daiwa/es-extensions' or its corresponding type declarations.
Error: Process completed with exit code 2.


# Node.js

Run actions/checkout@v4
Syncing repository: TokugawaTakeshi/Yamato-Daiwa-ES-Extensions
Getting Git version info
Temporarily overriding HOME='D:\a\_temp\2ed48dfb-8ba4-4b8f-8eb5-f30c1031a601' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
"C:\Program Files\Git\bin\git.exe" config --global --add safe.directory D:\a\Yamato-Daiwa-ES-Extensions\Yamato-Daiwa-ES-Extensions
Deleting the contents of 'D:\a\Yamato-Daiwa-ES-Extensions\Yamato-Daiwa-ES-Extensions'
Initializing the repository
Disabling automatic garbage collection
Setting up auth
Fetching the repository
Determining the checkout info
"C:\Program Files\Git\bin\git.exe" sparse-checkout disable
"C:\Program Files\Git\bin\git.exe" config --local --unset-all extensions.worktreeConfig
Checking out the ref
  "C:\Program Files\Git\bin\git.exe" checkout --progress --force -B @v1.10 refs/remotes/origin/@v1.10
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/Images/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne-LiveTemplateDemo.gif: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/TableOfContents/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.toc.english.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/TableOfContents/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.toc.japanese.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/TableOfContents/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.toc.russian.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/TableOfContents/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.toc.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.pug: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.japanese.pug: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.russian.pug: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/TableOfContents/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.toc.english.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/TableOfContents/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.toc.japanese.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/TableOfContents/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.toc.russian.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/TableOfContents/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.toc.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.pug: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.japanese.pug: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.russian.pug: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements/TableOfContents/getIndexesOfSatisfiesThePredicateArrayElements.toc.english.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements/TableOfContents/getIndexesOfSatisfiesThePredicateArrayElements.toc.japanese.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements/TableOfContents/getIndexesOfSatisfiesThePredicateArrayElements.toc.russian.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements/TableOfContents/getIndexesOfSatisfiesThePredicateArrayElements.toc.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/09-Other/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove/TableOfContents/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove.toc.english.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/09-Other/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove/TableOfContents/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove.toc.japanese.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/09-Other/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove/TableOfContents/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove.toc.russian.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/Arrays/09-Other/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove/TableOfContents/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove.toc.yaml: Filename too long
  Error: error: unable to create file Documentation/01-Source/Pages/CoreLibrary/Functionality/RawObjectDataProcessor/Children/06-ValidationIssues/Examples/ValidationErrorsMessages/RawObjectDataProcessor-ValidationErrorsMessage-RawDataIsNotObject.example.ts: Filename too long
  Error: error: unable to create file docs/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/Images/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne-LiveTemplateDemo--8df11e7f80.gif: Filename too long
  Error: error: unable to create file docs/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html: Filename too long
  Error: error: unable to create file docs/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.japanese.html: Filename too long
  Error: error: unable to create file docs/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.russian.html: Filename too long
  Switched to a new branch '@v1.10'
  branch '@v1.10' set up to track 'origin/@v1.10'.
  Error: The process 'C:\Program Files\Git\bin\git.exe' failed with exit code 1
