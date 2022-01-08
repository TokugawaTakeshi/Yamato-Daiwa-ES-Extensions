# `getArrayElementMatchingWithPredicateIfSuchElementExactlyOne`

[![Official plugin](https://img.shields.io/badge/IntelliJ_IDEA_Live_Template-getArrayElementMatchingWithPredicateIfSuchElementExactlyOne-blue.svg?style=flat)](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions)

```
getArrayElementMatchingWithPredicateIfSuchElementExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>, 
  predicate: (arrayElement: ArrayElement) => boolean
): ArrayElement | null

getArrayElementMatchingWithPredicateIfSuchElementExactlyOne<ArrayElement>(
  targetArray: Array<ArrayElement>, 
  predicate: (arrayElement: ArrayElement) => boolean,
  options: { throwErrorIfElementNotFoundOrMoreThan1: true; }
): ArrayElement
```

* Returns the element matching with the `predicate` is such element is exactly one in `targetArray`.
* If the element matching with the `predicate` is not presents or there are multiple matches with the predicate,
  * error will be thrown if `throwErrorIfElementNotFoundOrMoreThan1` option has been specified as `true`.
  * otherwise `null` will be returned

If you want all matches with the predicate, not only first one, use the native method 
[`Array.prototype.filter`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).


## Comparing with native methods

### `Array.prototype.filter`

Returns all matches with the predicate, not just first one as `getArrayElementMatchingWithPredicateIfSuchElementExactlyOne`.

### `Array.prototype.find`

* Returns first match with predicate same as `getArrayElementMatchingWithPredicateIfSuchElementExactlyOne`
* If there are multiple matches with the predicate, the subsequent matches will be ignored while
  `getArrayElementMatchingWithPredicateIfSuchElementExactlyOne` will not return it.
* If there is no element matching with the predicate, `undefined` will be returned. The behaviour of
  `getArrayElementMatchingWithPredicateIfSuchElementExactlyOne` depends on third parameter (default is returning of `null`).


## Examples

Below example will use this sample array:

```typescript
const sample: Array<string> = [ "Saint Paul", "Santa Barbara", "St. Louis", "Santa Monica" ];
```

### One match

```typescript
console.log(
  getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("St.")
  )
); // => "St. Louis"
```

### More than one match
#### Returning of `null`

```typescript
console.log(
  getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
    sample, (arrayElement: string): boolean => arrayElement.startsWith("Santa")
  )
); // => null
```

#### Throwing of the error

```typescript
try {

  const match: string = getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
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
  getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
      sample, (arrayElement: string): boolean => arrayElement.startsWith("Las")
  ),
  null
); // => null
```

#### Throwing of the error

```typescript
try {
  
  const match: string = getArrayElementMatchingWithPredicateIfSuchElementExactlyOne(
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
