# `getArrayElementMatchingWithPredicateIfSuchElementExactlyOne`

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
* If the element matching with the `predicate` is not presents or there are multiple matches the predicate,
  * error will be thrown if `throwErrorIfElementNotFoundOrMoreThan1` option has been specified as `true`.
  * otherwise `null` will be returned

If you want all matches with the predicate, not only first one, use the native method 
[`Array.prototype.filter`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).


## Comparing with native methods

* `Array.prototype.filter`
* `Array.prototype.find`

