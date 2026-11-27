# Yamato Daiwa E(CMA)S(cript) Extensions (YDEE)

[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package)
[![MIT](https://img.shields.io/badge/MIT-green?style=for-the-badge)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![IntelliJ IDEA plugin](https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

[![NPM Version](https://img.shields.io/npm/v/@yamato-daiwa/es-extensions)](https://www.npmjs.com/package/@yamato-daiwa/es-extensions)
![No any type](https://img.shields.io/badge/Type_safety-No_any-brightgreen.svg?style=flat)
![No third-party dependencies](https://img.shields.io/badge/Dependencies-No--third_party_dependencies-brightgreen.svg?style=flat)

[![GitHub Sponsors](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions?sponsor=1)
[![PAYPAL](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/tokugawatakeshi)
[![LIBERAPAY](https://img.shields.io/badge/Liberapay-F6C915?style=for-the-badge&logo=liberapay&logoColor=black)](https://liberapay.com/TokugawaT-YD)


Helper functions and classes aimed to reduce the routine code. 
Many of them even should be available natively.

![Hero image of @yamato-daiwa/es-extensions](https://repository-images.githubusercontent.com/376176365/ab848ff3-8bfb-4142-8b8f-fe191340bb3a)

+ ✅ Build-in TypeScript type safety without `any` type.
+ ✅ Oriented to TypeScript users investing the time to quality including type-safety.

Functions names and parameters name may be considered as long and verbose but this is intentional because the API has
  been developed such as the meaning must be clear without the referring of the documentation.
Such approach is the opposite of short names which provides the quick inputting but it is required to memorize what
  each function doing (can you clearly explain the difference between `pop`, `push`, `shift` and `unsift` native methods
  right now?) and reach the documentation each time when forgot. 


## Installation

```
npm i @yamato-daiwa/es-extensions -E
```


## Support Status

|Versions Range | Status |
|---|---|
| ~1.10.0 | Alpha/Beta |
| ~1.9.0  | Supported  |
| &gt; = 1.6.0 <= 1.8.X  | Bugs and security issues fixes for premium users only |
| < 1.6  | End of Life |


## Get started

+ [Installation](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#INSTALLATION--SECTION)
+ [Information About Distribution Size](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#DISTRIBUTIVE_VOLUME_NOTICE--SECTION)
+ [Precautions for Non-Users of TypeScript](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#NON_TYPE_SCRIPT_USAGE_WARNING--SECTION)
+ [Importing Functionality](https://ee.yamato-daiwa.com/CoreLibrary/GettingStarted/GetStartedWithCoreLibraryPage.english.html#IMPORTING_OF_FUNCTIONALITY--SECTION)


## Functionality Reference 
### Table of Contents

[//]: # (⚠️ During the markdown processing, npm official site replaces custom anchors like `<a href="#Arrays">Arrays</a>` with)
[//]: # (  `<h3 id="user-content-AJAX" class="heading-element">AJAX</h3>` what negates the manual anchors management with HTML )
[//]: # (  syntax. Forces to use normal markdown headings and links with automatic IDs.)

+ [AJAX](#ajax)
  + [`AJAX_Service` Class](#ajax_service-class) ([Main Article](Documentation/AJAX/AJAX_Service.md))
  + [`FetchAPI_Service` Class](#fetchapi_service-class) ([Main Article](Documentation/AJAX/FetchAPI_Service.md))
  + [`URI_QueryParametersSerializer` Type](#uri_queryparametersserializer-type)
+ [Arrays](#arrays)
  + [Creating](#creating)
    + [`createArrayOfNaturalNumbers`](#createarrayofnaturalnumbers) ([Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/00-Creating/createArrayOfNaturalNumbers/createArrayOfNaturalNumbers.english.html))
  + [Retrieving of Elements](#retrieving-of-elements)
    + [`getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne`](#getarrayelementsatisfiesthepredicateifsuchelementisexactlyone) ([Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html))
    + [`getLastElementOfArray`](#getlastelementofarray) ([Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getLastElementOfArray/getLastElementOfArray.english.html))
  + [Retrieving of Indexes](#retrieving-of-indexes)
    + [`getIndexesOfSatisfiesThePredicateArrayElements`](#getindexesofsatisfiesthepredicatearrayelements)  ([Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements/getIndexesOfSatisfiesThePredicateArrayElements.english.html))
    + [`getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne`](#getindexofarrayelementsatisfiesthepredicateifsuchelementisexactlyone) ([Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html))
  + [Retrieving of Subarrays](#retrieving-of-subarrays)
    + [`cropArray`](#croparray) ([Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/03-RetrievingOfSubarrays/cropArray/cropArray.english.html))
  + [Adding of Elements](#adding-of-elements)
    + [`addElementsToArray`](#addelementstoarray) ([Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/04-AddingOfElements/addElementsToArray/addElementsToArray.english.html))
  + [Replacing of Elements](#replacing-of-elements)
  + [Permutations of Elements](#permutations-of-elements)
  + [Removing of Elements](#removing-of-elements)
  + [Restructuring](#restructuring)
  + [Other](#other)
+ [Data Mocking](#data-mocking)
  + [`DataMocking` Class/Namespace](#datamocking-classnamespace)
  + [`MockGatewayHelper` Class/Namespace ](#mockgatewayhelper-classnamespace-)
+ [Date and Time](#date-and-time)
  + [`CalendarBuilder` Class](#calendarbuilder-class)
  + [`convert24_HoursFormatTo12_HoursFormat`](#convert24_hoursformatto12_hoursformat)
  + [`DateWithoutTime` Class](#datewithouttime-class)
+ [Default Value Substituters](#default-value-subsituters)
+ [Errors](#errors)
+ [Files](#files)
+ [Logging](#logging)
+ [Maps](#maps)
+ [Numbers](#numbers)
+ [Objects](#objects)


### AJAX
#### `AJAX_Service` Class

The facade for the convenient usage of [AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX") with maximal 
  type-safety and less code.

+ Integrated with [RawObjectDataProcessor](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/RawObjectDataProcessor/RawObjectDataProcessor.english.html)
    for validation and, if required, the processing of the response data.
+ Needs some implementation, but there is [FetchAPI_Service](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/FetchAPI_Service/FetchAPI_Service.english.html),
    the pre-made one.

[📖 Main Article](Documentation/AJAX/AJAX_Service.md)


#### `FetchAPI_Service` Class

The implementation of [`AJAX_Service` abstract class](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html). 
  based on [`Fetch API`](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API). 
Works with all modern browsers, and also stable in Node.js since version **22**. 

[📖 Main Article](Documentation/AJAX/FetchAPI_Service.md)


#### `URI_QueryParametersSerializer` Type

```
(URI_QueryParameters: ReadonlyParsedJSON) => string;
```

The function-like [TypeScript type](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#reusable-types-type-aliases).
The implementation of this signature must accept the JSON-compatible object as the argument and return the string 
  represented the valid query part of a URI.  

May be used in any code dealing with a data exchange via HTTP.
Inside YDEE, the [`AJAX_Service` class](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/AJAX/AJAX_Service/AJAX_Service.english.html) using this type for the eponymous protected static field.


### Arrays
#### Creating
##### createArrayOfNaturalNumbers

```
(
  compoudParameter:
    {
  
      /** @description Must be the natural number. */
      elementsCount: number;
  
      /** @default false */
      isDescendingOrder?: boolean;
  
      /** @default 1 */
      startingNumber?: number;

    }
) => Array<number>
```

Obviously from the function name, creates an array of natural numbers.
Elements’ count, ascending/descending and starting number can be specified.

<details open>
  <summary>Examples</summary>
  <pre><code>
/* 〚 Output 〛[ 1, 2, 3 ]  */
console.log(
  createArrayOfNaturalNumbers({ elementsCount: 3 })
);
 
/* 〚 Output 〛[ 3, 2, 1 ]  */
console.log(
  createArrayOfNaturalNumbers({ elementsCount: 3, isDescendingOrder: true })
);
 
/* 〚 Output 〛[ 6, 7, 8 ]  */
console.log(
  createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: 6 })
);
 
/* `InvalidParameterValueError` will be thrown */
console.log(
  createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: 1, isDescendingOrder: true })
);
  </code></pre>
</details>

[📖 Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/00-Creating/createArrayOfNaturalNumbers/createArrayOfNaturalNumbers.english.html)


#### Retrieving of Elements
##### getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne
 
```
/** @description [ 1st overload ] Returns null when element satisfying the predicate is not exatcly one. */
<ArrayElement>(
  targetArray: Array<ArrayElement>, 
  predicate: (arrayElement: ArrayElement) => boolean
) => ArrayElement | null

/** @description [ 2nd overload ] Throws a error when element satisfying the predicate is not exatcly one. */ 
<ArrayElement>(
  targetArray: Array<ArrayElement>,
  predicate: (arrayElement: ArrayElement) => boolean,
  options: { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true; }
) => ArrayElement
```

Returns the element of a specified array matching with the predicate if such an element is exactly one, 
  otherwise `UnexpectedEventError` will be thrown or null will be returned depending on dedicated option's value.

<details open>
  <summary>Examples</summary>
  <pre><code>
const sample: ReadonlyArray&lt;string&gt; = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];
 
/* 〚 Output 〛"St. Louis" */
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
  )
);
 
/* 〚 Output 〛null */
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("Santa")
  )
);
 
/* 〚 Output 〛null */
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("Las")
  )
);
 
/* `UnexpectedEventError` will be thrown */
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample,
    (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
    { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true }
  )
);
  </code></pre>
</details>

[📖 Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html)


##### getLastElementOfArray

```
/** @description [ 1st overload ] Returns null when target array is empty. */
<ArrayElement>(targetArray: Array<ArrayElement>) => ArrayElement | null;

/** @description [ 2nd overload ] Throws error when target array is empty. */
<ArrayElement>(
 targetArray: Array<ArrayElement>,
 options: { mustThrowErrorIfArrayIsEmpty: true; }
) => ArrayElement
```

Returns the last element of an array if such the element exists, otherwise `UnexpectedEventError` will be thrown as default, 
  or null will be returned if the dedicated option has been specified.

<details open>
  <summary>Examples</summary>
  <pre><code>
/* 〚 Output 〛"charlie" */
console.log(
  getLastElementOfArray([ "alpha", "bravo", "charlie" ])
);
 
/* 〚 Output 〛null */
console.log(
  getLastElementOfArray([])
);
 
/* `UnexpectedEventError` will be thrown */
console.log(
  getLastElementOfArray([], { mustThrowErrorIfArrayIsEmpty: true })
);
  </code></pre>
</details>

[📖 Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/01-RetrievingOfElements/getLastElementOfArray/getLastElementOfArray.english.html)


#### Retrieving of Indexes
##### getIndexesOfSatisfiesThePredicateArrayElements

```
<ArrayElement>(
 targetArray: Array<ArrayElement>, 
 predicate: (arrayElement: ArrayElement) => boolean
) => Array<number>
```

Obviously from the function name, returns the array of indexes of array elements which are satisfied to specified 
  predicate function.

<details open>
  <summary>Examples</summary>
  <pre><code>
type Product = { title: string; price: number; };
 
const sample: ReadonlyArray&lt;Product&gt; = [
  { title: "ALPHA", price: 100 },
  { title: "BRAVO", price: 500 },
  { title: "CHARLIE", price: 1000 },
  { title: "DELTA", price: 1500 }
];
 
/* 〚 Output 〛[ 2, 3 ] */
console.log(
  getIndexesOfSatisfiesThePredicateArrayElements(
    sample, (arrayElement: Product): boolean => arrayElement.price > 500
  )
);
 
/* 〚 Output 〛[] */
console.log(
  getIndexesOfSatisfiesThePredicateArrayElements(
    sample, (arrayElement: Product): boolean => arrayElement.price > 1500
  )
);
  </code></pre>
</details>

[📖 Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexesOfSatisfiesThePredicateArrayElements/getIndexesOfSatisfiesThePredicateArrayElements.english.html)


##### getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne

```
/** @description [ 1st overload ] 
* Returns null when there is no matches with the predicate or such matches are more than one */
<ArrayElement>(
 targetArray: Array<ArrayElement>, 
 predicate: (arrayElement: ArrayElement) => boolean
) => number | null;

/** @description [ 2st overload ] 
* Throws the error when there is no matches with the predicate or such matches are more than one */
<ArrayElement>(
 targetArray: Array<ArrayElement>,
 predicate: (arrayElement: ArrayElement) => boolean,
 options: { mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: true; }
) => number;
```

Returns the index of the array element satisfies the predicate if such element is exactly one, otherwise error will 
  be thrown or null will be returned depending on dedicated option's value.

[📖 Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/02-RetrievingOfIndexes/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne/getIndexOfArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne.english.html)

[//]: # (TODO Examples)

#### Retrieving of Subarrays
##### cropArray

```
<ArrayElement>(

 sourceDataAndOptions:
 
     (
       {
         mutably: true;
         targetArray: Array<ArrayElement>;
       } |
       {
         mutably: false;
         targetArray: ReadonlyArray<ArrayElement>;
       }
     ) &
     
     (
       (
         { fromStart: true; } &
         (
           { startingElementNumber__numerationFrom0: number; } |
           { startingElementNumber__numerationFrom1: number; } |
           { fromFirstElement: true; }
         ) &
         (
           { endingElementNumber__numerationFrom0__including: number; } |
           { endingElementNumber__numerationFrom1__including: number; } |
           { endingElementNumber__numerationFrom0__notIncluding: number; } |
           { endingElementNumber__numerationFrom1__notIncluding: number; } |
           { elementsCount: number; } |
           { untilLastElement: true; }
         )
       ) |
       
       (
         { fromEnd: true; } &
         (
           { rightElementNumber__numerationFrom0_AndRight: number; } |
           { rightElementNumber__numerationFrom1_AndRight: number; } |
           { fromRightmostElement: true; }
         ) &
         (
           { leftElementNumber__numerationFrom0_AndRight__including: number; } |
           { leftElementNumber__numerationFrom1_AndRight__including: number; } |
           { leftElementNumber__numerationFrom0_AndRight__notIncluding: number; } |
           { leftElementNumber__numerationFrom1_AndRight__notIncluding: number; } |
           { elementsCount: number; } |
           { untilLeftmostElement: true; }
         )
       )
     ) &
     
     { mustThrowErrorIfSpecifiedElementsNumbersAreOutOfRange: boolean; }

) => Array<ArrayElement> 
```

Creates the subarray of the specified array.
In comparison with native [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  and [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) methods, 
  suggests the extremely flexible API:

+ Mutable and immutable cropping
+ Specifying of starting element and ending element either from the start or from the end of an array
+ Absolute and relative specifying of starting and ending elements of subarray
+ Inclusive and exclusive absolute specifying of last element of subarray

<details open>
  <summary>Examples</summary>
  <pre><code>
 
  </code></pre>
</details>

[📖 Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/03-RetrievingOfSubarrays/cropArray/cropArray.english.html)


#### Adding of Elements
##### addElementsToArray

```
<ArrayElement>(

  compoundParameter:

      { newElements: ReadonlyArray<ArrayElement>; } &
      
      (
        {
          mutably: true;
          targetArray: Array<ArrayElement>;
        } |
        {
          mutably: false;
          targetArray: ReadonlyArray<ArrayElement>;
        }
      ) &
      
      (
        { toStart: true; } |
        { toEnd: true; } |
        { toPosition__numerationFrom0: number; } |
        { toPosition__numerationFrom1: number; }
      )

  ): Array<ArrayElement>
```

Adds one or more elements to the start, end or specified position of the target array, herewith the adding can be 
  mutable or not depending on dedicated property of the object-type parameter.

<details open>
  <summary>Examples</summary>
  <pre><code>
 
  </code></pre>
</details>

[📖 Main Article](https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/04-AddingOfElements/addElementsToArray/addElementsToArray.english.html)


#### Replacing of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/05-ReplacingOfElements/replaceArrayElementsByIndexesImmutably/replaceArrayElementsByIndexesImmutably.english.html"><code>replaceArrayElementsByIndexesImmutably</code></a></dt>
  <dd>

 Creates the swallow copy of the target array and replaces the elements by specified indexes.
    
  ```
  <ArrayElement>(

    sourceDataAndOptions:

        { targetArray: ReadonlyArray<ArrayElement>; } &

        (
          {
            index: number;
            newElement: ArrayElement;
          } |
          {
            replacements: ReadonlyArray<{
              index: number;
              newElement: ArrayElement;
            }>;
          }
        )

  ): Array<ArrayElement>
  ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/05-ReplacingOfElements/replaceArrayElementsByPredicates/replaceArrayElementsByPredicates.english.html"><code>replaceArrayElementsByPredicates</code></a></dt>
  <dd>

 Replaces array elements by one or more predicates, herewith the replacing can be mutable or no depending on dedicated option.

  ```
  <ArrayElement>(
    sourceDataAndOptions:

        (
          {
            mutably: true;
            targetArray: Array<ArrayElement>;
          } |
          {
            mutably: false;
            targetArray: ReadonlyArray<ArrayElement>;
          }
        ) &
        (
          Replacement<ArrayElement> |
          { replacements: Array<Replacement<ArrayElement>>; }
        )

  ): 
      {
        updatedArray: Array<ArrayElement>;
        indexesOfReplacedElements: Array<number>;
      }
  ```

  ```ts
  type Replacement<ArrayElement> = Readonly<
    { predicate: (arrayElement: ArrayElement) => boolean; } &
    (
      { newValue: ArrayElement; } |
      { replacer: (currentValueOfElement: ArrayElement) => ArrayElement; }
    )
  >;
  ```
  </dd>

</dl>


#### Permutations of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/06-PermutationsOfElements/moveArrayElementToOnePosition/moveArrayElementToOnePosition.english.html"><code>moveArrayElementToOnePosition</code></a></dt>
  <dd>

 Moves specified by an index element to left or to right, herewith the ousted element will be placed to position of target one.
    Mutable and immutable swapping are available.

   ```
   <ArrayElement>(

     sourceDataAndOptions:
      
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &
         (
           { targetElementNumber__numerationFrom0: number; } |
           { targetElementNumber__numerationFrom1: number; }
         ) &
         {
           toLeft: boolean;
           errorMustBeThrownIf: {
             elementsCountIsLessThan2: boolean;
             targetElementNumberIsOutOfRange: boolean;
           }
         }
       
   ): Array<ArrayElement>
   ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/06-PermutationsOfElements/swapArrayElements/swapArrayElements.english.html"><code>swapArrayElements</code></a></dt>
  <dd>

 <p>Swaps two array elements, not obligatory the siblings.</p>
    <ul>
      <li>Each element can be specified by index, by number from 1 or via predicate.</li>
      <li>Mutable and immutable swapping are available</li>
    </ul>

   ```
   <ArrayElement>(

     sourceDataAndOptions:

         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &

         {
         
           oneElement: 
           
               {
                 position__numerationFrom0: number;
                 mustThrowErrorIfNotFound: boolean;
               } |
               {
                 position__numerationFrom1: number;
                 mustThrowErrorIfNotFound: boolean;
               } |
               { isLastOne: true; } |
               {
                 finder: (arrayElement: ArrayElement) => boolean;
                 mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: boolean;
               };
           
           otherElement: 
           
               {
                 position__numerationFrom0: number;
                 mustThrowErrorIfNotFound: boolean;
               } |
               {
                 position__numerationFrom1: number;
                 mustThrowErrorIfNotFound: boolean;
               } |
               { isLastOne: true; } |
               {
                 finder: (arrayElement: ArrayElement) => boolean;
                 mustThrowErrorIfElementNotFoundOrMatchesAreMultiple: boolean;
               }
           
         } &
          
         {
           mustThrowErrorIfTargetArrayIsEmpty: boolean;
           mustThrowErrorIfSpecifiedBothElementsRefersToSamePosition: boolean;
         }

   ): Array<ArrayElement>
   ```

  </dd>

</dl>


#### Removing of Elements

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/07-RemovingOfElements/removeArrayElementsByIndexes/removeArrayElementsByIndexes.english.html"><code>removeArrayElementsByIndexes</code></a></dt>
  <dd>

 Removes array elements by indexes, herewith the removing can be mutable or no depending on the dedicated option.

   ```
   (
     compoundParameter:
      
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &
         { indexes: number | ReadonlyArray<number>; }
     
   ): 
       {
         updatedArray: Array<ArrayElement>;
         removedElements: Array<ArrayElement>;
       }
   ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/07-RemovingOfElements/removeArrayElementsByPredicates/removeArrayElementsByPredicates.english.html"><code>removeArrayElementsByPredicates</code></a></dt>
  <dd>

 Removes array elements by one or more predicates, herewith the removing can be mutable or not depending on the dedicated option.

   ```
   <ArrayElement>(
   
     compoundParameter:
     
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         ) &
         
         (
           { predicate: (arrayElement: ArrayElement) => boolean; } |
           { predicates: ReadonlyArray<(arrayElement: ArrayElement) => boolean>; }
         )
     
   ): 
   
       {
         updatedArray: Array<ArrayElement>;
         removedElements: Array<ArrayElement>;
         indexesOfRemovedElements: Array<number>;
       }    
   ```

  </dd>

</dl>


#### Restructuring

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/08-Restructuring/twoDimensionalizeArray/twoDimensionalizeArray.english.html"><code>twoDimensionalizeArray</code></a></dt>
  <dd>
    
 Converts a flat array to a 2-dimensional array with nested arrays of fixed elements count.
  
   ```
   <ArrayElement>(
     {
       targetFlatArray,
       elementsCountPerNestedArray
     }: 
         {
           targetFlatArray: Array<ArrayElement>;
           elementsCountPerNestedArray: number;
         }
   ): 
      Array<Array<ArrayElement>>
   ```     
    
</dd>

</dl>


##### Other

<dl>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/09-Other/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove/addElementsToArrayIfTheyAreNotPresentOtherwiseRemove.english.html"><code>addElementsToArrayIfTheyAreNotPresentOtherwiseRemove</code></a></dt>
  <dd>

 <p>Obviously from the function name, adds elements to an array if they do not present otherwise remove them.</p>
    <ul>
      <li>
        For all types of elements except numbers, bigints, strings and booleans the element finding predicate must be
          specified.
      </li>
       <li>Mutable and immutable manipulations are available</li>
    </ul>

   ```
   /** @description [ 1st overload ] The array of primitive type elements */
   <ArrayElement extends number | bigint | string | boolean>(
   
     compoundParameter:
       
         (
           { targetElement: ArrayElement; } |
           { targetElements: ReadonlyArray<ArrayElement>; }
         ) &
         
         (
           { addingToStart: true; } |
           { addingToEnd: true; } |
           { addingToPosition__numerationFrom0: number; } |
           { addingToPosition__numerationFrom1: number; }
         ) &
         
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         )
       
   ): Array<ArrayElement>

    /** @description [ 1st overload ] The array of non-primitive type elements */
   <ArrayElement extends Exclude<unknown, number | bigint | string | boolean>>(
   
     compoundParameter:
    
         (
           {
             targetElement: ArrayElement;
             targetElementFinder: (arrayElement: ArrayElement) => boolean;
           } |
           {
             targetElements: ReadonlyArray<ArrayElement>;
             targetElementsFinder: (arrayElement: ArrayElement) => boolean;
           }
         ) &
         
         (
           { addingToStart: true; } |
           { addingToEnd: true; } |
           { addingToPosition__numerationFrom0: number; } |
           { addingToPosition__numerationFrom1: number; }
         ) &
         
         (
           {
             mutably: true;
             targetArray: Array<ArrayElement>;
           } |
           {
             mutably: false;
             targetArray: ReadonlyArray<ArrayElement>;
           }
         )
    
   ): Array<ArrayElement>;
   ```

  </dd>

  <dt><a href="https://ee.yamato-daiwa.com/CoreLibrary/Functionality/Arrays/09-Other/readonlyArrayToMutableOne/readonlyArrayToMutableOne.english.html"><code>readonlyArrayToMutableOne</code></a></dt>
  <dd>

 <ul>
      <li>
        From the viewpoint of TypeScript, allows to mutate the <code>ReadonlyArray</code> what basically not recommeded
          but in some particular cases almost inevitably.
      </li>
      <li>From the viewpoint of JavaScript, does nothing.</li>
    </ul>

   ```
   <ArrayElement>(targetArray: ReadonlyArray<ArrayElement>): Array<ArrayElement>
   ```

  </dd>

</dl>


### Data Mocking

The tools for the data mocking.
The data mocking is demanded in both frontend and backend during the development of web and native
  applications, websites and more.
The mock data must satisfy the limitations by business rules and make tests easier.
At the same time, this functionality is not intended to be used in production.


#### `DataMocking` Class/Namespace

+ The class is abstract and have only static members (currently only `decideOptionalValue` method). 
  So, the instance cannot be created without violation of TypeScript.
+ The namespace stores `OptionalPropertiesDecisionStrategies` enumeration.

[📖 Main Article](Documentation/DataMocking/DataMocking.md)


#### `MockGatewayHelper` Class/Namespace 

The <def>gateway</def> is the **Clean Architecture** context is the polymorphic interface defines the basic transactions 
  with the entities.
It is critical to keep gateways not coupled with any frameworks and/or databased, the one implementations may be replaced
  with another implementation or same gateway.
Particularly, the implementations exchanging by data with the database (local or remote one) may be replaced with mock 
  implementations.

Also, mocking the data, usually we need more that just the data.
Additionally, we may need to:

+ Simulate the data retrieving state, herewith adjust the time (for example, to check is loading placeholder displays correctly)
+ Simulate the data retrieving failure to check does application handle the error correctly.

The `MockGatewayHelper` can take care about the routines.
It also not required to extend your gateways implementations from `MockGatewayHelper` — just use its static methods.

[📖 Main Article](Documentation/DataMocking/MockGatewayHelpler.md)


### Date and Time
#### `CalendarBuilder` Class

To display all days of any month of any year, you need **6 rows × 7 columns = 42 cells** table.
Each cell will include the data (number of day in month) — mostly of current month, but maybe also 
  the last days of previous month and/or first days of next month.
You may want to display them if developing the calendar for the GUI application, or just compute something
  based on these days — anyway first you need the array of above numbers, and this is on what `CalendarBuilder`
  specialized.

[📖 Main Article](Documentation/DateTime/CalendarBuilder.md)



#### `convert24_HoursFormatTo12_HoursFormat`

```
(hoursAmount__24Format: number) => 
    {
      hoursAmount__12HoursFormat: number;
      isBeforeNoon: boolean;
      isAfterNoon: boolean;
    }
```

Obviously from the function name, converts the hours amount from 24-hour format to 12-hour format.
Of course, besides the amount it also will be returned the boolean values to identify is amount corresponding to
  before or after midnight.

The type definition of return value available as `ConvertingOf24_HoursFormatTo12_HoursFormat.Result`.


#### `DateWithoutTime` Class

An alternative to native `Date` (which actually is not only the Date but also the time).
Obvious from the class name, works only with date not associated with specific time zone and does not work with time.
The most demanded functionality is `format` static method allows defining the arbitrary formatting of 
  target date with optimized computing.

[📖 Main Article](Documentation/DateTime/DateWithoutTime.md)


##### `getDaysCountInSpecificMonth`

```
(
  sourceDataAndOptions: 
      { year: number; } &
      (
        { monthNumber__numerationFrom0: number; } |
        { monthNumber__numerationFrom1: number; }
      )
) => number
```

Returns days count in specified year and month.

[📖 Main Article](Documentation/DateTime/getDaysCountInSpecificMonth.md)


##### `getISO8601_StringWithoutTimePart`

```
(
  sourceDataAndOptions: Readonly<
    (
      {
        ISO8601Definition: string;
        mustConsiderAsLocalIfTimeNotSpecified: boolean;
      } |
      (
        { year__UTC: number; } &
        (
          { monthName__UTC: MonthsNames; } |
          { monthNumber__UTC__numerationFrom0: number; } |
          { monthNumber__UTC__numerationFrom1: number; }
        ) &
        { dayOfMonth__UTC: number; }
      ) |
      { nativeDateInstance: Date; }
    ) &
    { mustAssociateOutputWithLocalDate: boolean; }
  >
) => string
```

Obviously to function name, returns the date definition without time in ISO8601 format.
The parameters can be defined by various methods.

[📖 Main Article](Documentation/DateTime/getISO8601_StringWithoutTimePart.md)


##### `getMonthNameByNumber`

```
(
  sourceDataAndOptions: { targetMonthNumber: number; numerationFrom: number; }
) => MonthsNames
```

Converts the month number (from 0 or 1) to element of 
  [`MonthsNames` enumeration](#https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md).

[📖 Main Article](Documentation/DateTime/getMonthNameByNumber.md)


##### `getMonthNumberByName`

```
(
  sourceDataAndOptions: { targetMonthName: MonthsNames; numerationFrom: number; }
) => number
```

Converts the element of [`MonthsNames` enumeration](#https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md) to number of month (from 0 or 1).

[📖 Main Article](Documentation/DateTime/getMonthNumberByName.md)


##### `getNextMonthNumber`

```
(
  sourceDataAndOptions:
      Readonly<
        (
          (
            { referenceMonthNumber__numerationFrom0: number; } |
            { referenceMonthNumber__numerationFrom1: number; }
          ) |
          { referenceMonthName: MonthsNames; }
        ) &
        { firstMonthNumberInRelationToReturnableValue: 0 | 1; }
      >
) => number
```

Returns next month number in relation to specified year and month number; numeration from 0 and 1 is available for both 
  parameter and returned value.

[📖 Main Article](Documentation/DateTime/getNextMonthNumber.md)



##### `getPreviousMonthNumber`

```
(
  sourceDataAndOptions:
      Readonly<
        (
          (
            { referenceMonthNumber__numerationFrom0: number; } |
            { referenceMonthNumber__numerationFrom1: number; }
          ) |
          { referenceMonthName: MonthsNames; }
        ) &
        { firstMonthNumberInRelationToReturnableValue: 0 | 1; }
      >
): number
```

Returns previous month number in relation to specified year and month number; numeration from 0 and 1 is available for 
  both parameter and returned value.

[📖 Main Article](Documentation/DateTime/getPreviousMonthNumber.md)


##### `getYearOfNextMonth`

```
(
  sourceDataAndOptions:
      { referenceYear: number; } &
      (
        { referenceMonthNumber__numerationFrom0: number; } |
        { referenceMonthNumber__numerationFrom1: number; }
      )
) => number
```

Returns the year of next month in relation to specified year and month.

[📖 Main Article](Documentation/DateTime/getYearOfNextMonth.md)


##### `getYearOfPreviousMonth`

```
(
  sourceDataAndOptions:
      { referenceYear: number; } &
      (
        { referenceMonthNumber__numerationFrom0: number; } |
        { referenceMonthNumber__numerationFrom1: number; }
      )
) => number
```

Returns the year of previous month in relation to specified year and month.

[📖 Main Article](Documentation/DateTime/getYearOfPreviousMonth.md)


##### `hasTimeCome`

```
(targetDateTime: Date | string) => boolean
```

Returns boolean value indicates has specified date and time come. 
Native [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and 
  [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) formats supported.


##### `isValidNativeDate`

```
(targetDate: Date) => boolean
```

Returns boolean value indicates does specified date represents the valid date and time.
The `Date` constructor will not throw error if to initialize it with some non-date expression like `new Date("---")`,
  and if to call `toString()` on this `Date` instance, it will return `"Invalid Date"` string.
A human can understand that date is invalid by this string value, but the comparing like 
  `date.toString() !== "Invalid Date"` requires the memorizing of `"Invalid Date"`.  


##### `millisecondsToSeconds`

```
(millisecondsAmount: number) => number
```

Converts milliseconds amount to amount of seconds.
The JavaScript API using milliseconds widely, but for the human the seconds are easier to read. 


##### `secondsToMilliseconds`

```
(secondsAmount: number) => number
```

Converts seconds amount to amount of milliseconds.
The JavaScript API using milliseconds widely, but for the human the seconds are easier to read. 



##### `TimePoint` Class

An alternative of native [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) 
  which actually is not only the Date but also the time.

+ Has similar API with [DateWithoutTime](Documentation/DateTime/DateWithoutTime.md), but there is also has the conceptual 
  difference: while `DateWithoutTime` is the date not associated with specific time zone and does not work with time,
  `TimePoint` works with time and also has the accusation with specific time zone
+ The most demanded functionality is `format` static method allows defining the arbitrary formatting of 
  target date with optimized computing.

[📖 Main Article](Documentation/DateTime/TimePoint.md)


##### `Timer` Class

Abstract class indented to be inherited and implemented with environment-dependent functionality.


### Default value Subsituters

Although the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
  makes the below functions redundant, they still can be used in the environments with old ECMAScript versions.

<dl>

  <dt>substituteWhenNull</dt>
  <dd>Substitutes the second argument's value when first one is null.</dd>

  <dt>substituteWhenUndefined</dt>
  <dd>Substitutes the second argument's value when first one is <b>undefined</b>.</dd>

</dl>


#### Errors

<dl>

  <dt><code>AlgorithmMismatchError</code></dt>
  <dd>Intended to be used in general cases when actual behavior does not match with desired.</dd>

  <dt><code>ClassRedundantSubsequentInitializationError</code></dt>
  <dd>Intended to be used when the class developed as singleton has been attempted to initialize twice.</dd>

  <dt><code>ClassRequiredInitializationHasNotBeenExecutedError</code></dt>
  <dd>Intended to be used when the class beside the constructor requires the initialization but the initializing method has not been called.</dd>

  <dt><code>ConfigFileNotFoundError</code></dt>
  <dd>Intended to be used when some utility requires the config file, but it has not been found.</dd>

  <dt><code>CrossBrowserIssueError</code></dt>
  <dd>Intended to be used when some processing could not be executed because of certain browser's limitations.</dd>

  <dt><code>DataRetrievingFailedError</code></dt>
  <dd>Intended to be used when the data retrieving from some external resource (server, database, file, etc.) failed.</dd>

  <dt><code>DataSubmittingFailed</code></dt>
  <dd>Intended to be used when the data submitting to any external resource (server, database, etc.) failed.</dd>

  <dt><code>DOM_ElementRetrievingFailedError</code></dt>
  <dd>
    Intended to used when expected to be existing DOM element has not been retrieved.
    Related not only with browser JavaScript but also with processing of HTML code at server side.
  </dd>

  <dt><code>FileReadingFailedError</code></dt>
  <dd>Intended to be used when the file reading has not gone as expected</dd>

  <dt><code>FileWritingFailedError</code></dt>
  <dd>Intended to be used when the file writing has not gone as expected</dd>

  <dt><code>ImproperUsageError</code></dt>
  <dd>
    Intended to be used when the class/function has been attempted to use improperly. 
    Herewith, try to name the function/methods such as it will be obvious how to use it and also limit the usage by 
      TypeScript typing.
  </dd>

  <dt><code>IncompatiblePropertiesInObjectTypeParameterError</code></dt>
  <dd>
    Intended to be used when in parameter <b>exampleParameter</b> of object type one of properties 
    <b>exampleParameter.propertyA</b> and <b>exampleParameter.propertyB</b> must be omitted but both has been specified.
  </dd>

  <dt><code>InterProcessInteractionFailedError</code></dt>
  <dd>
    Intended to be used when the interaction between NodeJS processed is not going as expected. 
    Could be actual, for example, for the Electron.js where the main process and render process are exchanges by data.
  </dd>

  <dt><code>InvalidConfigError</code></dt>
  <dd>
    Intended to be used when config validation was not passed.
    Appending of the validation errors messages to <b>InvalidConfigError</b>'s message is strongly recommended.
  </dd>

  <dt><code>InvalidExternalDataError</code></dt>
  <dd>
    Intended to be used when the data from the external data source does not match with expected. 
    Appending of the validation errors messages to <b>InvalidExternalDataError</b>'s message is strongly recommended.</dd>

  <dt><code>InvalidParameterValueError</code></dt>
  <dd>
    Intended to be used when the parameter's does not fit to some limitations.
    Although the TypeScript allows to define and check the parameter's type, no type check will not be executed
    once TypeScript will be compiled to JavaScript. Also, is the parameter has limitations like smallest numerical 
    value or maximal characters count, <b>InvalidParameterValueError</b> has been developed for such cases.
  </dd>

  <dt><code>ModuleDynamicLoadingFailedError</code></dt>
  <dd>Recommended to throw when the module dynamical loading failed. Actual for bundlers like Webpack.</dd>

  <dt><code>UnexpectedEventError</code></dt>
  <dd>
    Intended to be used when the probability of the occurrence of some "else if" branch is very small and 
      impossible for normal operation of the program.
  </dd>

  <dt><code>UnsupportedScenarioError</code></dt>
  <dd>Intended to be used when occurred some scenario which is not supported yet.</dd>

</dl>


##### HTTPS

<dl>

  <dt><code>HTTP_ResponseBodyParsingFailureError</code></dt>
  <dd>Intended to be used when HTTP response body has not been parsed successfully.</dd>

</dl>


### Files
#### `encodeFileToBase64`

```
(targetFile: File) => Promise<string>
```

Represents an instance of [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) as Base64 encoded string.
It may require, for instance, when uploading the file.

The representing of an instance `File` as Base64 encoded string natively is not difficult, but a little bit verbose
  and also the dealing with TypeScript types will require, because 
  [`result` property](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/result) of 
  [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) class may 
  be string, `ArrayBuffer` or `null`.
`encodeFileToBase64` function takes case about these routines and suggesting the promisfied API.


### Logging
#### `Logger` Facade

Basic facade for providing of the high-quality logging with customizable output destinations, formatting and limitations.

[📖 Main Article](Documentation/Logging/Logger/Logger.md)


#### `ILogger` Interface

Used for the custom implementation of loggers.
[//]: # (todo =========================================================================================================&#41;)


### Maps
#### `addEntriesToMap`

```
<Key, Value>(
  compoundParameter: 
      Readonly<
        (
          {
            mutably?: true;
            targetMap: Map<Key, Value>;
          } |
          {
            mutably: false;
            targetMap: ReadonlyMap<Key, Value>;
          }
        ) &
        (
          {
            newKey: Key;
            newValue: Value;
          } |
          { newEntries: ReadonlyMap<Key, Value> | ReadonlyArray<[ Key, Value ]>; }
        )
      >
) => Map<Key, Value>
```

Adds multiple entries to map.
May be done immutably — in this case, the new Map container will created, however if there are object-types values or keys, 
  then the full depth copy of each element will not be created (and can not be created in general case).


#### `createMapBasedOnOtherMap`

```
<InputMapKey, InputMapValue, OutputMapKey, OutputMapValue>(
  initialMap: ReadonlyMap<InputMapKey, InputMapValue>,
  transformer: (inputMapKey: InputMapKey, inputMapValue: InputMapValue) => [ OutputMapKey, OutputMapValue ]
) => Map<OutputMapKey, OutputMapValue>
```

Creates map based on other map.
The function like native [`Array.prototype.map()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
  but for the maps.


#### `filterMap`

```
<Key, Value>(

  sourceDataAndOptions:

      (
        {
          targetMap: Map<Key, Value>;
          mutably: true;
        } |
        {
          targetMap: ReadonlyMap<Key, Value>;
          mutably: false;
        }
      ) &
  
      { filter: (key: Key, value: Value) => boolean; }

) => Map<Key, Value>
```

+ When `mutably` option has been specified with `true`, deletes the entries from the source map which does not satisfy
    the predicate. 
  In this case, the source map can not have `ReadonlyMap` because `filterMap` needs to modify it. 
+ When `mutably` option has been specified with `false`, creates the map based on the source map, herewith the key-value 
  pairs from the source will be included to new map only if satisfied to specified predicate.
  In this case, `filterMap` function is like native [`Array.prototype.filter()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
  but for the maps.


#### `getExpectedToBeNonUndefinedMapValue`

```
<Key, Value extends Exclude<unknown, undefined>>(
  targetMap: ReadonlyMap<Key, Value>, 
  targetKey: Key
) => Value
```

Intended to be used when the confidence about the existence of non-undefined value of certain map corresponding to 
  specified key is enough high to be fine to be thrown the error when contrary to expectations the specified value is not
  exists.

The native [`Map.prototype.get()` method](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/get)
  has `get(key: K): V | undefined` signature what means that a value corresponding to specified key may not exist.
However, there are many cases when either target value exists, or it is the application bug when to be thrown the error 
  is fine.
Contrary to native `Map.prototype.get()` method,  `getExpectedToBeNonUndefinedMapValue` either returns the non-undefined 
  value, or throws the error.


#### `getOneEntryOfMap`

```
/** @description [ 1st overload ] Returns undefined when target map is empty. */
<Key, Value>(targetMap: ReadonlyMap<Key, Value>) => [ Key, Value ] | undefined
 
/** @description [ 2nd overload ] Throws a error when target map is empty but return value never will be `undefined`. */ 
<Key, Value>(
  targetMap: ReadonlyMap<Key, Value>,
  options: Readonly<{ mustThrowErrorIfMapIsEmpty: true; }>
) => [ Key, Value ]
```

Returns one key-value pair of specified map.  
Since the map is the collection without fixed order of elements, there is no so-called "first" key-value pair.

+ If the second parameter is not specified then the return will be `undefined` when target map is empty
+ If the second parameter specified with `{ mustThrowErrorIfMapIsEmpty: true; }` then the return value does not need
    the non-undefined check but is map is actually empty, `UnexpectedEventError` will be thrown.  


#### `invertMapImmutably`

```
<Key, Value>(initialMap: ReadonlyMap<Key, Value>) => Map<Value, Key>
```

Creates the map based on specified source one, but instead of the keys will be the values and vice versa.



#### `mergeMaps`

```
<Key, Value>(...targetMaps: ReadonlyArray<ReadonlyMap<Key, Value>>) => Map<Key, Value>
```

Creates the map including the keys-value pars of all maps passed via parameters.


#### `removeEntriesFromMap`

```
<Key, Value>(
  {
    targetMap,
    mutably,
    ...sourceData
  }: 
      (
        {
          mutably?: true;
          targetMap: Map<Key, Value>;
        } |
        {
          mutably: false;
          targetMap: ReadonlyMap<Key, Value>;
        }
      ) &
      (
        { key: Key; } |
        { keys: ReadonlyArray<Key>; }
      )
) => 
    {
      updatedMap: Map<Key, Value>;
      removedEntries: Map<Key, Value>;
    }
```

Obviously from the function name, removes the entries from map, herewith is can be done mutably or no.

+ If you are need to remove only by the one key, when specify the property `key` of the object-type parameter.
  Otherwise, pass the array of keys via `keys` property.
+ If you are need the keys to be removed mutably, the the source map can not have type `ReadonlyMap`.
+ The removed entries will be returned inside the object of `RemovingEntriesFromMap.Result` type.


#### `replaceValuesInMap`

```
(
  compoundParameter:
      (
        {
          mutably?: true;
          targetMap: Map<Key, Value>;
        } |
        {
          mutably: false;
          targetMap: ReadonlyMap<Key, Value>;
        }
      ) &
      (
        ReplacingOfValuesInMap.Replacement<Key, Value> |
        { replacements: ReadonlyArray<ReplacingOfValuesInMap.Replacement<Key, Value>>; }
      )
) => Map<Key, Value>
```

Replaces the value in specified map, herewith:

+ The replacement can be executed either by specified keys or by the replacing function which accepts the current value
  as the single parameter.
+ The replace can be mutably or not, meanwhile for mutable replacement case the source map can not be of `ReadonlyMap` type.


### Numbers
#### `formatNumberWith4_KetaKanji`

```
(targetNumber: number | bigint | string) => string
```

Formats number with 4-digits Kanji 万, 億, 兆, 系 (CJK ideographic characters).
Because this function is actual for multiple languages, is has not been moved to the localization package. 

[📖 Main Article](Documentation/Numbers/formatNumberWith4KetaKanji/formatNumberWith4KetaKanji.md)


#### `getArithmeticMean`

```
(...numbers: Array<number>) => number
```

Computes the arithmetic mean of arbitrary quantity of number.

[📖 Main Article](Documentation/Numbers/getArithmeticMean.md)


#### `isStringifiedNonNegativeIntegerOfRegularNotation`

```
(value: string) => boolean
```

Checks is the value of string contains the number of non-scientific notation.

[📖 Main Article](Documentation/Numbers/isStringifiedNonNegativeIntegerOfRegularNotation/isStringifiedNonNegativeIntegerOfRegularNotation.md)


#### `limitMaximalValue`

```
/** @description [ 1st overload ] For the numbers smaller than `Number.MAX_SAFE_INTEGER`. */
(
  compoundParameter: { targetNumber: number; maximalValue: number; }
) => number

/** @description [ 2nd overload ] For the number which may be greater than `Number.MAX_SAFE_INTEGER`. */ 
(
  compoundParameter: { targetNumber: number | bigint; maximalValue: bigint; }
) => bigint;
```

Compares the target number with specified maximal value and returns either target number (when it less than maximal value)
  or maximal value (when the target number is greater than maximal value).


#### `limitMinimalAndMaximalValues`

```
/** @description [ 1st overload ] For the numbers smaller than `Number.MAX_SAFE_INTEGER`. */
export default function limitMinimalAndMaximalValues(
  sourceDataAndOptions: 
      {
        targetNumber: number;
        minimalValue: number;
        maximalValue: number;
      }
): number;

/** @description [ 2nd overload ] For the number which may be greater than `Number.MAX_SAFE_INTEGER`. */ 
export default function limitMinimalAndMaximalValues(
  sourceDataAndOptions: 
      {
        targetNumber: number | bigint;
        minimalValue: number | bigint;
        maximalValue: bigint;
      }
): bigint;

```

The combination of `limitMaximalValue` and `limitMinimalValue`.
Limits `targetNumber` from both left and right.
Return `targetNumber` when it lies between specified `minimalValue` and `maximalValue`, otherwise returns the
  specified limit which has been exceeded. 


#### `limitMinimalValue`

```
/** @description [ 1st overload ] For the numbers smaller than `Number.MAX_SAFE_INTEGER`. */
(
  { targetNumber, minimalValue }: { targetNumber: number; minimalValue: number; }
) => number

/** @description [ 2nd overload ] For the number which may be greater than `Number.MAX_SAFE_INTEGER`. */ 
(
  { targetNumber, minimalValue }: { targetNumber: number | bigint; minimalValue: bigint; }
) => bigint;
```

Compares the target number with specified minimal value and returns either target number (when it grater than minimal value)
  or minimal value (when the target number is smaller than minimal value).


#### `roundDownToSpecificIntegerPlaceValue`

```
(
  sourceDataAndOptions:
      {
        targetNumber: number;
        trailingZerosCount: number;
      }
) => number
```

Rounds down the number to specific nearest integer place value.

[📖 Main Article](Documentation/Numbers/roundDownToSpecificIntegerPlaceValue.md)


#### `roundToSpecificNearestIntegerPlaceValue`

```
(
  sourceDataAndOptions:
      {
        targetNumber: number;
        trailingZerosCount: number;
      }
) => number
```

Rounds to specific nearest integer place value, for instance the rounding of `15836`...

+ to tens will be `15840`
+ to hundreds will be `15800`
+ to thousands will be `16000`

and so on.

[📖 Main Article](Documentation/Numbers/roundToSpecificNearestIntegerPlaceValue.md)


#### `roundToSpecifiedNearestDecimalPlaceValue`

```
(
  sourceDataAndOptions: { targetNumber: number; digitsCountAfterDecimalPoint: number; }
) => number
```

Rounds to specific nearest decimal place value, for instance the rounding of `1.11` to 1 digit after the decimal point
  will be `1.1` and the routing of `1.115` to 2 digits after decimal point will be `1.12`.

[📖 Main Article](Documentation/Numbers/roundToSpecifiedNearestDecimalPlaceValue/roundToSpecifiedNearestDecimalPlaceValue.md)


#### `roundUpToSpecificIntegerPlaceValue`

```
(
  sourceDataAndOptions: { targetNumber: number; trailingZerosCount: number; }
) => number
```

Rounds the number to specific nearest integer place value.

[📖 Main Article](Documentation/Numbers/roundUpToSpecificIntegerPlaceValue.md)


#### `separateEach3_DigitsGroupWithComma`

```
(targetNumber: number | bigint | string) => string
```

Formats the number separating each 3 digits group with comma.

[📖 Main Article](Documentation/Numbers/separateEach3_DigitsGroupWithComma.md)


#### `separateEach4DigitsGroupWithComma`

```
(targetNumber: number | bigint | string) => string
```

Formats the number separating each 4 digits group with comma

[📖 Main Article](Documentation/Numbers/separateEach4_DigitsGroupWithComma.md)


### Objects
#### `getEntriesOfObjectWithFixedKeysSetAndUniformValues`

```
<Keys extends string, Values>(
  targetObject: Readonly<{ [key in Keys]?: Values; }>
) => 
    Array<[ Keys, Values ]>
```

The native [Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
  returns the array of tuple `[string, T][]` where `T` is the union of all possible values but the keys are always `string`
  even the object with filed keys passed.
The `getEntriesOfObjectWithFixedKeysSetAndUniformValues` alternatives keeps the fixed keys.


#### `getObjectPropertySafely`

```
(
  targetObject: unknown,
  dotSeparatedOrArrayedPathToTargetProperty: Array<string | number> | string | number
) => unknown
```

Works as [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining](optional chaining)
  but can be used for any fully-qualified name and returns value which being considered as `unknown`. 
Intended to be used when the schema of value is not known enough (for example, because of lack of TypeScript type definition).


#### `setObjectProperties`

```
setObjectProperties<TargetObject extends object>(
  targetObject: TargetObject,
  order:
      {
        [dotSeparatedFullyQualifiedName: string]:
            Readonly<PropertyDescriptor & { mustCreateParentsObjectsIfNotPresent?: boolean; }>;
      }
) => void
```

Sets or adds the entries to object by the fully qualified name.
Basically there is no need in such function when the TypeScript typing is strong, but if there some external
  data with unknown at advance schema, it is a way to simply specify some properties even for arbitrary depth level.
The `order` — the second parameters of this function — is the associative array like object where the keys are the
  fully qualified named of target properties but the values the [property descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor#description),  
  not the raw values which must be set.
In addition to native attributes (`value`, `writable`, etc.) there is also `mustCreateParentsObjectsIfNotPresent` option
  which prevents the adding of new property when specified with `false` and there is not the parent object.


### Pagination

The working with pagination is actual for both client and server programming whether the displaying of the pagination or
  just the computing from and until which item must be selected.

#### `computeFirstItemNumberForSpecificPaginationPage`

```
(
  sourceDataAndOptions: 
      {
        currentPageNumber: number;
        itemsCountPerPage: number;
      }
) => number
```

Obviously from the function name, computes the first item number for the specific pagintion page.
Current page number and items count per page must be specified.


#### `computeLastItemNumberForSpecificPaginationPage`

```
(
  sourceDataAndOptions: 
      {
        currentPageNumber: number;
        itemsCountPerPage: number;
        totalItemsCount: number;
      }
) => number
```

Obviously from the function name, computes the last item number for the specific pagintion page.
Besides the current page number and items counts per pagination page, the total items count must be specified.


#### `getItemsOfPaginationPage`

```
<Item>(
  sourceDataAndOptions: 
    
      {
        items: ReadonlyArray<Item>;
        itemsCountPerPaginationPage: number;
      } & 
      (
        {
          targetPageNumber__numerationFrom1: number;
          targetPageNumber__numerationFrom0?: undefined;
        } | 
        {
          targetPageNumber__numerationFrom0: number;
          targetPageNumber__numerationFrom1?: undefined;
        }
      )
    >
) => Array<Item>
```

Takes the subarray for specified page number (counting from `0` and `1` are both supported) and items
  count per pagination page.


#### `PaginationCollection` class

The class storing the 2-dimensional array corresponding to items distributed by the pagination page.
May be used instead of `getItemsOfPaginationPage` function if it is required to access the items of 
  multiple pages.
And contrary, it is better to use `getItemsOfPaginationPage` function if it is required only get the items
  of specific pagination page without data storing. 


##### Constructor

```
(sourceDataAndOptions: PaginationCollection.CompoundParameter<Item>)
```

Only target items and their count per pagination page must be specified.


##### `pagesCount` Public Field

The computed pagination pages count based on specified items and their count per pagination page.
The readonly one since currently the mutating of `PaginationCollection` is not supported.


##### `getItemsOfSpecificPage` method

```
(compoundParameter: Readonly<{ targetPageNumber: number; numerationFrom: 0 | 1; }>) => Array<Item>
```

Returns the items corresponding to specified target page number, the numeration from `0` or `1` supported.
Unlike `getItemsOfPaginationPage` function, the items count per pagination page can not be explicitly specified
  because it was already done during the creating of instance of `PaginationCollection`.


#### RawObjectDataProcessor

The tool for the validation and processing of unknown at advance external data (from HTTP requests/responses, files, etc.).

* [📖 Quick example](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#quick-example)
* [📖 Problem overview](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#problem-overview)
* [📖 Theoretical minimum](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#theoretical-minimum)
* [📖 Getting started](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/RawObjectDataProcessor/RawObjectDataProcessor.md#getting-started)


##### Pre-made pre-validation modifiers

Intended to be used when some property is expected to be the string but also expected to be a valid number if to parse it.

<dl>

  <dt>convertPotentialStringToFloatIfPossible</dt>
  <dd>Tries to convert the string to decimal fraction; returns the number in success case otherwise returns the initial value.</dd>

  <dt>convertPotentialStringToIntegerIfPossible</dt>
  <dd>Tries to convert the string to integer; returns the number in success case otherwise returns the initial value.</dd>

  <dt>convertPotentialStringToNumberIfPossible</dt>
  <dd>
    Tries to convert the string to integer or decimal fraction (depending on decimal part separator presence); 
    returns the number in success case otherwise returns the initial value.
  </dd>

</dl>


#### Strings

All functions working with strings are supporting the [surrogate pairs](https://stackoverflow.com/questions/31986614/what-is-a-surrogate-pair).
If some function works incorrectly with surrogate pairs, it means the bug; please feel free to open issue in this case.

<dl>

  <dt>areStringifiedDigitsOnly</dt>
  <dd>Checks is string value consists exclusively from the digits.</dd>

  <dt>capitalizeFirstCharacter</dt>
  <dd>Capitalizes first character of target string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/EmailAddress.md">EmailAddress</a></dt>
  <dd>Class working with email addresses. Currently, consists from validating function and regular expression of valid emails.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/explodeCasedPhraseToWords.md">explodeCasedPhraseToWords</a></dt>
  <dd>Explodes the string containing grammatically normal or cased (camel case, snake case, etc.) expression to words and returns the array of them. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt>getLastCharacter</dt>
  <dd>Returns the last character of target string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/getPositionsOfAllSubstringOccurrences.md">getPositionsOfAllSubstringOccurrences</a></dt>
  <dd>Returns the positions of each occurrence of specified substring.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/hasStringOnlySpecificCharacters.md">hasStringOnlySpecificCharacters</a></dt>
  <dd>Checks does string including specified characters only without regular expression</dd>

  <dt>removeAllSpecifiedCharacters</dt>
  <dd>Removes specified characters from the string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeLastCharacter.md">removeLastCharacter</a></dt>
  <dd>Removes last character.</dd>

  <dt>removeNonDigitsCharacters</dt>
  <dd>Removes all characters from the string except digits.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeNthCharacter.md">removeNthCharacter</a></dt>
  <dd>Removes the character in specified position from the string. Supports the surrogate pairs.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/removeSpecificCharacterFromCertainPosition.md">removeSpecificCharacterFromCertainPosition</a></dt>
  <dd>Removes specific character from the specific position.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/replace2OrMoreSpacesTo1.md">replace2OrMoreSpacesTo1</a></dt>
  <dd>Replaces 2 or more spaces to 1.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/replaceBrHTML_TagToNewLineEscapeSequence.md">replaceBrHTML_TagToNewLineEscapeSequence</a></dt>
  <dd>Replaces the "br" HTML tag to new line (line feed) escape sequence.</dd>

  <dt>insertSubstring</dt>
  <dd>Insets nullable substring with optional condition and transformations.</dd>

  <dt>insertSubstringIf</dt>
  <dd>Insets substring conditionally.</dd>
  
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/isIPv4AddressLiesInRange.md">isIPv4AddressLiesInRange</a></dt>
  <dd>Check does specified IP address lies in specific range.</dd>

  <dt>reverseString</dt>
  <dd>Reverses the characters sequence in string value.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/splitString.md">splitString</a></dt>
  <dd>Alternative of native <code>String.prototype.split()</code>; unlike it supports the UTF16 surrogate pairs.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/stringifyAndFormatArbitraryValue/stringifyAndFormatArbitraryValue.md">stringifyAndFormatArbitraryValue</a></dt>
  <dd>Converts to readable string and formats if possible any type of data.</dd>

  <dt>replaceDoubleBackslashesWithForwardSlashes</dt>
  <dd>Replaces double backslashes with forward slashes.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toLowerCamelCase.md">toLowerCamelCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to (lower) camel case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toScreamingSnakeCase.md">toScreamingSnakeCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to screaming snake case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/toUpperCamelCase.md">toUpperCamelCase</a></dt>
  <dd>Converts the string containing grammatically normal or cased (camel case, snake case, etc.) expression to upper camel case AKA Pascal case. Currently, 26 latin characters of English alphabet are supported.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Strings/trimSpaces/trimSpaces.md">trimSpaces</a></dt>
  <dd>Trims prepended and/or appended space characters; unlike native <code>String.prototype.trim()</code> acts selectively on specified spaces kinds.</dd>
 
</dl>


#### Sets

<dl>
  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Sets/addMultipleElementsToSet/addMultipleElementsToSet.md">addMultipleElementsToSet</a></dt>
  <dd>Adds multiple elements to set.</dd>
</dl>


#### Types

<dl>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Types/ParsedJSON/ParsedJSON.md"><b>ParsedJSON</b> and related</a></dt>
  <dd>The native object including the Array case which could be the result of JSON parsing.</dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/Types/InheritEnumerationKeys.md">InheritEnumerationKeys</a></dt>
  <dd>Allows to create the object with same keys as reference enumeration.</dd>

  <dt>PartialBy</dt>
  <dd>Makes specified properties of base type optional.</dd>

</dl>


#### Type guards

* [Numbers](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Numbers/NumberTypeGuards.md)
* [Strings](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Strings/StringTypeGuards.md)
* [Objects](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Objects/ObjectTypeGuards.md)
* [Arrays](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Arrays/ArrayTypeGuards.md)
* [Nullables](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Nullables/NullableTypeGuards.md)
* [Other](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/TypeGuards/Others/OtherTypeGuards.md)



#### Value transformers

* emptyStringToNull
* nullToEmptyString
* nullToUndefined
* nullToZero
* undefinedToEmptyArray
* undefinedToEmptyString
* undefinedToNull


#### Random values generators

<dl>

  <dt>getRandomArrayElement</dt>
  <dd>Returns the random element of specified array.</dd>

  <dt>getRandomBoolean</dt>
  <dd>Returns "true" or "false" randomly.</dd>

  <dt>getRandomInteger</dt>
  <dd>Returns random integer not less than specified **minimalValue** and more than **maximalValue**.</dd>

  <dt>getRandomLatinCharacter</dt>
  <dd>Returns random latin character.</dd>

  <dt>getRandomObjectPropertyValue</dt>
  <dd>Returns random object property value.</dd>

  <dt>getRandomSubarray</dt>
  <dd>Returns the selection of elements of specified array; minimal and maximal elements count could be specified.</dd>

  <dt>getSpecificBooleanValueWithProbability</dt>
  <dd>Returns specific boolean value with specified probability.</dd>

</dl>


#### Constants and enumerations

##### Date and time

<dl>

  <dt>CHARACTERS_COUNT_OF_DATE_PART_IN_ISO8601_STRING</dt>
  <dd>
    The character count represents the date without time in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO8601 string</a>. 
    Has value <b>10</b>; for example, in the <code>2013-03-10T02:00:00Z</code> case the first 10 characters will be <code>2013-03-10</code>.
    If you need to extract this date part from ISO8601 string (not just know the characters count), use <a href="Documentation/DateTime/getISO8601_StringWithoutTimePart.md"><code>getISO8601_StringWithoutTimePart</code></a> function.
  </dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/DaysOfWeek.md">DaysOfWeek</a></dt>
  <dd>Allows to refer to the day of week by name, not by number what usually confusing with numeration from 0 (and also, first day of week is location dependent).</dd>

  <dt>HOURS_PER_STELLAR_DAY</dt>
  <dd>
    Has value <b>24</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MAXIMAL_DAYS_IN_MONTH</dt>
  <dd>
    Has value <b>31</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MINUTES_PER_HOUR</dt>
  <dd>
    Has value <b>60</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt>MONTHS_PER_YEAR</dt>
  <dd>
    Has value <b>12</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

  <dt><a href="https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/MonthsNames.md">MonthsNames</a></dt>
  <dd>Allows to refer to the month by name, not by number what usually confusing with numeration from 0.</dd>

  <dt>SECONDS_PER_MINUTE</dt>
  <dd>
    Has value <b>60</b>. 
    Everyone may know it but the meaning of this constant is avoiding of the <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)">magic numbers</a> in the code.
  </dd>

</dl>


##### HTTP

* [HTTP_Methods](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_Methods.md)
* [HTTP Status codes](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md)
  * [All](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#http_statuscodes---all-http-status-codes)
  * [Information responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#informationalresponseshttp_statuscodes---information-responses)
  * [Successful responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#successfulresponseshttp_statuscodes---successful-responses)
  * [Redirection messages](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#redirectionresponseshttp_statuscodes---redirection-messages)
  * [Client error responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#clienterrorshttp_statuscodes---client-error-responses)
  * [Server error responses](https://github.com/TokugawaTakeshi/Yamato-Daiwa-ES-Extensions/blob/master/CoreLibrary/Package/Documentation/ConstantsAndEnumerations/HTTP_StatusCodes.md#servererrorshttp_statuscodes---server-error-responses)
