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
`isElementOfEnumeration<EnumerationElement extends string | number>(
  possibleEnumerationElement: string | number, 
  targetEnumeration: { [key: string]: EnumerationElement; 
}): possibleEnumerationElement is EnumerationElement`
```
