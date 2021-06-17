# @yamato-daiwa/es-extensions

<div style="border: 1px solid #F1C40F; padding: 12px 14px">
  ⚠ Currently the library is under development.
</div>


Helper functions and classes aimed to reduce the routine code. Build-in TypeScript type safety without `any` type.


## Installation

```
npm i @yamato-daiwa/es-extensions -E
```


## Temporary simple documentation

Refer to this documentation until the official documentation is under development.


### Get functionality

Most of the functionality is available for both Browser JavaScript and Node.js.

```typescript
export { isUndefined, isNull } from "@yamato-daiwa/es-extensions";
```


#### BrowserJS functionality

```typescript
export { delegateClickEventHandling } from "@yamato-daiwa/es-extensions/BrowserJS";
```


#### NodeJS functionality

```typescript
export { NodeJS_Timer } from "@yamato-daiwa/es-extensions/NodeJS";
```


### Numbers

#### `formatNumberWith4KetaKanji`: Format number with 4-digits Kanji (CJK Ideographic characters)

```
formatNumberWith4KetaKanji(targetNumber: number | bigint | string): string
```

```typescript
console.log(formatNumberWith4KetaKanji(12345)); // "1万2345"
console.log(formatNumberWith4KetaKanji(123456)); // "12万3456"
console.log(formatNumberWith4KetaKanji(1234567)); // "123万4567"
console.log(formatNumberWith4KetaKanji(12345678)); // "1234万5678"

console.log(formatNumberWith4KetaKanji(123456789)); // "1億2345万6789"
console.log(formatNumberWith4KetaKanji(1234567890)); // "12億3456万7890"
console.log(formatNumberWith4KetaKanji(12345678901)); // "123億4567万8901"
console.log(formatNumberWith4KetaKanji(123456789012)); // "1234億5678万9012"

console.log(formatNumberWith4KetaKanji(1234567890123)); // "1兆2345億6789万0123"
console.log(formatNumberWith4KetaKanji(12345678901234)); // "12兆3456億7890万1234"
console.log(formatNumberWith4KetaKanji(123456789012345)); // "123兆4567億8901万2345"
console.log(formatNumberWith4KetaKanji(1234567890123456)); // "1234兆5678億9012万3456"

// MAX_SAFE_INTEGER excess:
console.log(formatNumberWith4KetaKanji(12345678901234567)); // "1234兆5678億9012万3458" !! Last ditig is differs!
// Solution:
console.log(formatNumberWith4KetaKanji(BigInt(12345678901234567)));　// 1京2345兆6789億0123万4567
// Or:
console.log(formatNumberWith4KetaKanji(String(12345678901234567)));　// 1京2345兆6789億0123万4567

console.log(formatNumberWith4KetaKanji(1234567890123456)); // -1234兆5678億9012万3456
console.log(formatNumberWith4KetaKanji(-123456789.543)); // -1億2345万6789.543
```

#### `isStringifiedNonNegativeIntegerOfRegularNotation`: Is stringified non-negative integer of regular notation check

```
isStringifiedNonNegativeIntegerOfRegularNotation(value: string): boolean
```

The "regular notation" is unofficial name of antonym of [Scientific notation](https://en.wikipedia.org/wiki/Scientific_notation)
AKA **exponential notation**.
It means that `isStringifiedNonNegativeIntegerOfRegularNotation` returns `true` for `"30"` but `false` for `"3e+1"`
although `"3e+1"` is `30` in exponential notation.

```typescript
console.log(isStringifiedNonNegativeIntegerOfRegularNotation("30")) // true
console.log(isStringifiedNonNegativeIntegerOfRegularNotation("3e+1")) // false
```

#### `separateEach3DigitsGroupWithComma`: Separate each 3 digits group with comma

```
separateEach3DigitsGroupWithComma(targetNumber: number | bigint | string): string
```

```typescript
console.log(separateEach3DigitsGroupWithComma(1234)); // "1,234"
console.log(separateEach3DigitsGroupWithComma("1234")); // "1,234"
console.log(separateEach3DigitsGroupWithComma(BigInt("1234"))); // "1,234"

console.log(separateEach3DigitsGroupWithComma(12345)); // "12,345"
console.log(separateEach3DigitsGroupWithComma(123456)); // "123,456"
console.log(separateEach3DigitsGroupWithComma(1234567)); // "1,234,567"

console.log(separateEach3DigitsGroupWithComma(-3456)); // "-3,456"
console.log(separateEach3DigitsGroupWithComma(-3456.4567)); // "-3,456.4,567"
console.log(separateEach3DigitsGroupWithComma("1.23456e+5")); // "1.23,456e+5"

// MAX_SAFE_INTEGER excess:
console.log(separateEach3DigitsGroupWithComma(13000000000000007)); // "13,000,000,000,000,008" !
// Solution:
console.log(separateEach3DigitsGroupWithComma("13000000000000007")); // "13,000,000,000,000,007"
// Or:
console.log(separateEach3DigitsGroupWithComma(BitInt("13000000000000007"))); // "13,000,000,000,000,007"
```


#### `separateEach4DigitsGroupWithComma`: Separate each 4 digits group with comma

```
separateEach4DigitsGroupWithComma(targetNumber: number | bigint | string): string
```

Some Eastern calculus system are oriented to 4-digits group, not to 3-digits group
(thousands, millions, billions, trillions etc).

```typescript
console.log(separateEach4DigitsGroupWithComma(12345)); // "1,2345"
console.log(separateEach4DigitsGroupWithComma("12345")); // "1,2345"
console.log(separateEach4DigitsGroupWithComma(BigInt("12345"))); // "1,2345"

console.log(separateEach4DigitsGroupWithComma(123456)); // "12,3456"
console.log(separateEach4DigitsGroupWithComma(1234567)); // "123,4567"
console.log(separateEach4DigitsGroupWithComma(12345678)); // "1234,5678"

console.log(separateEach4DigitsGroupWithComma(-34567)); // "-3,4567"
console.log(separateEach4DigitsGroupWithComma(-34568.45679)); // "-3,4568.4,5679"
console.log(separateEach4DigitsGroupWithComma("1.23456e+5")); // "1.2,3456e+5"

// MAX_SAFE_INTEGER excess:
console.log(separateEach3DigitsGroupWithComma(13000000000000007)); // "1,3000,0000,0000,0008" !
// Solution:
console.log(separateEach3DigitsGroupWithComma("13000000000000007")); // "1,3000,0000,0000,0007"
// Or:
console.log(separateEach3DigitsGroupWithComma(BitInt("13000000000000007"))); // "1,3000,0000,0000,0007"
```


#### Pagination related computings

Pagination is GUI component, however related computing are executed on both client and server sides.

##### `computeFirstItemNumberForSpecificPaginationPage`: Compute first item number for specific pagination page

```
function computeFirstItemNumberForSpecificPaginationPage(
  parametersObject: {
    currentPageNumber: number;
    itemsCountPerPage: number;
  }
): number
```

To compute it, it's required to know the **current page number** and **items count per pagination page**.
For example, when pagination has 20 items per page, the first item number in page 2 will be 21.


##### `computeLastItemNumberForSpecificPaginationPage`: Compute last item number for specific pagination page

```
export default function computeLastItemNumberForSpecificPaginationPage(
  parametersObject: {
    currentPageNumber: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
  }
): number
}
```

To compute it independently on first item number for specific pagination page, it's required to know below parameters:

* Current page number
* Items count per page
* Total items count

For example, when pagination has 20 items per page and total 25 items, the last item number for first page will be 20,
but for last one - 25.


### Date & Time

* `millisecondsToSeconds(millisecondsAmount: number): number`
* `secondsToMilliseconds(secondsAmount: number): number`


### Type Guards

#### Numbers

If you need to check just is value a number or not and nothing more, use `isNumber(targetValue)`.
Below functions besides make TypeScript believe that the value is a number (when value is actually a number) executes
some additional checks and returns `false` when some check has not been passed:

* `isDecimalFractionOfAnySign(potentialDecimalFraction: unknown): potentialDecimalFraction is number`
* `isNaturalNumber(potentialNaturalNumber: unknown): potentialNaturalNumber is number`
* `isNegativeDecimalFraction(potentialDecimalFraction: unknown): potentialDecimalFraction is number`
* `isNegativeInteger(potentialInteger: unknown): potentialInteger is number`
* `isNegativeIntegerOrZero(potentialInteger: unknown): potentialInteger is number`
* `isPositiveDecimalFraction(potentialDecimalFraction: unknown): potentialDecimalFraction is number`

<div style="border: 1px solid red; padding: 12px 14px"> 
  ⚠ In the Math, the `0` is a positive number so both "positive" and "non-negative" includes `0`.
</div>


#### Strings

If you need to check just is value a string or not and nothing more, use `isString(targetValue)`.
Below functions besides make TypeScript believe that the value is a string (when value is actually a string) executes some
additional checks and returns `false` when some check has not been passed:

* `isEmptyString(potentialString: unknown): potentialString is string`
* `isNonEmptyString(potentialString: unknown): potentialString is string`
* `isStringOfLength(potentialString: unknown): potentialString is string`

```typescript
isStringOfLength("abcde", { exactSymbolsCount: 5 }); // true
isStringOfLength("abcd", { exactSymbolsCount: 5 }); // false

isStringOfLength("abcde", { minimalSymbolsCount: 5 }); // true
isStringOfLength("abcd", { minimalSymbolsCount: 5 }); // false

isStringOfLength("abcde", { maximalSymbolsCount: 5 }); // true
isStringOfLength("abcdef", { maximalSymbolsCount: 5 }); // false

isStringOfLength("ab", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // true
isStringOfLength("abc", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // true
isStringOfLength("abcde", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // true
isStringOfLength("abcdef", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // false
isStringOfLength("a", { minimalSymbolsCount: 2, maximalSymbolsCount: 5 }); // false
```


#### Objects

<div style="border: 1px solid red; padding: 12px 14px"> 
  ⚠ Be careful that in ECMAScript <code>typeof null</code> is <code>object</code>. Because of this there is no confusing
    `isObject` type guard doing `typeof targetValue === "object"` in this library.
</div>

* `isEmptyObject(pointentialObject: unknown): pointentialObject is object`
* `isNonEmptyObject(pointentialObject: unknown): pointentialObject is object`
* `isNonNullObject(pointentialObject: unknown): pointentialObject is object`


#### Arrays

If you need to check just is value an array or not and nothing more, use native `Array.isArray(targetValue)`.
Below functions besides make TypeScript believe that the value is an array (when value is actually an array) executes
some additional checks and returns `false` when some check has not been passed:

* `isEmptyArray(potentialArray: unknown): potentialArray is Array<unknown>`
* `isNonEmptyArray(potentialArray: unknown): potentialArray is Array<unknown>`

```
isArrayOfCertainTypeElements<ArrayElementType>(
    potentialArray: unknown, elementTypeGuard: (element: unknown) => element is ArrayElementType
): potentialArray is Array<ArrayElementType>
```

```typescript
isArrayOfLength("abcde".split(""), { exactElementsCount: 5 }); // true
isArrayOfLength("abcd".split(""), { exactElementsCount: 5 }); // false

isArrayOfLength("abcde".split(""), { minimalElementsCount: 5 }); // true
isArrayOfLength("abcd".split(""), { minimalElementsCount: 5 }); // false

isArrayOfLength("abcde".split(""), { maximalElementsCount: 5 }); // true
isArrayOfLength("abcdef".split(""), { maximalElementsCount: 5 }); // false

isArrayOfLength("ab".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // true
isArrayOfLength("abc".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // true
isArrayOfLength("abcde".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // true
isArrayOfLength("abcdef".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // false
isArrayOfLength("a".split(""), { minimalElementsCount: 2, maximalElementsCount: 5 }); // false
```


#### Nullables

Strict config of [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) does not allow the short
checks like `if (value)` for non-booleans. Below checkers allows to simplify the type checking for `null` or `undefined`.

* `isNeitherUndefinedNorNull<TargetType>(targetValue: TargetType | null | undefined): targetValue is TargetType`
* `isNotNull<TargetValue>(targetValue: TargetValue | null): targetValue is TargetValue`
* `isNotUndefined<TargetValue>(targetValue: TargetValue | undefined): targetValue is TargetValue`
* `isNull<TargetValue>(targetValue: TargetValue | null): targetValue is null`
* `isUndefined(targetValue: unknown): targetValue is undefined`


#### Other

* `isBoolean(potentialBooleanValue: unknown): potentialBooleanValue is boolean`
* `isFunctionLike(potentialFunction: unknown): potentialFunction is Function`

```
isElementOfEnumeration<EnumerationElement extends string | number>(
  possibleEnumerationElement: string | number, 
  targetEnumeration: { [key: string]: EnumerationElement; 
}): possibleEnumerationElement is EnumerationElement`
```
