# `getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne`: Get array element satisfies with predicate if such element is exactly one

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

```
getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>, 
  predicate: (arrayElement: ArrayElement) => boolean
): ArrayElement | null

getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>, 
  predicate: (arrayElement: ArrayElement) => boolean,
  options: { throwErrorIfElementNotFoundOrMoreThan1: true; }
): ArrayElement
```

* Returns the element matching with the `predicate` is such element is exactly one in `targetArray`.
* If the element matching with the `predicate` is not presents or there are multiple matches with the predicate,
  * error will be thrown if `throwErrorIfElementNotFoundOrMoreThan1` option has been specified as `true`.
  * otherwise `null` will be returned

![IntelliJ IDEA Live Template](getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne-LiveTemplateDemo.gif)

If you want all matches with the predicate, not only first one, use the native method 
[`Array.prototype.filter`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).


## Comparing with native methods

Below native methods neither better nor worse than **getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne**;
which one to use is depending on which behavior you need if

* will not be desired element in array
* will be more than one element satisfies the matching with predicate.


### `Array.prototype.filter`

Returns all matches with the predicate, not just first one as `getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne`.

### `Array.prototype.find`

* Returns first match with predicate same as `getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne`
* If there are multiple matches with the predicate, the subsequent matches will be ignored while
  `getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne` will not return it.
* If there is no element matching with the predicate, `undefined` will be returned. The behaviour of
  `getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne` depends on third parameter (default is returning of `null`).


## Examples

Below examples will use this sample array:

```typescript
const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];
```

### One match (normal scenario)

```typescript
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
  )
); // => "St. Louis"
```

### More than one match
#### Returning of `null`

```typescript
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("Santa")
  )
); // => null
```

#### Throwing of the error

```typescript
let match: string;

try {

  match = getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample,
    (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
    { throwErrorIfElementNotFoundOrMoreThan1: true }
  );
  
} catch (error: unknown) {
  
  if (error instanceof UnexpectedEventError) {
    console.error("What!? I expected exactly one!");  
  }
}
```

### No matches
#### Returning of `null`

```typescript
console.log(
  getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
      sample, (arrayElement: string): boolean => arrayElement.startsWith("Las")
  ),
  null
); // => null
```

#### Throwing of the error

```typescript
try {
  
  const match: string = getArrayElementSatisfiesThePredicateIfSuchElementIsExactlyOne(
    sample,
    (arrayElement: string): boolean => arrayElement.startsWith("Santa"),
    { throwErrorIfElementNotFoundOrMoreThan1: true }
  );
  
} catch (error: unknown) {

  if (error instanceof UnexpectedEventError) {
    console.error("What!? I expected exactly one!");
  }
}
```
