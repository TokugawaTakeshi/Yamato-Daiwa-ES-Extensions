# `getMonthNameByNumber` - get month name by number

```
(
  namedParameters: Readonly<{ targetMonthNumber: number; numerationFrom: number; }>
): MonthsNames
```

Converts the month number (from 0 or 1) to element of 
[MonthsNames](./../ConstantsAndEnumerations/MonthsNames.md) enumeration.


## Examples

```typescript
console.log(getMonthNameByNumber({ targetMonthNumber: 1, numerationFrom: 0 })); // => "FEBRUARY"
console.log(getMonthNameByNumber({ targetMonthNumber: 1, numerationFrom: 1 })); // => "JANUARY"

console.log(getMonthNameByNumber({ targetMonthNumber: 11, numerationFrom: 0 })); // => "DECEMBER"
console.log(getMonthNameByNumber({ targetMonthNumber: 11, numerationFrom: 1 })); // => "NOVEMBER"
```


## Errors

`InvalidParameterValueError` will be thrown if:

1. `namedParameters.numerationFrom` is neither `0` nor `1`.
2. Both `namedParameters.targetMonthNumber` is `0` while `namedParameters.numerationFrom` is `1`.
3. Both `namedParameters.targetMonthNumber` is `12` while `namedParameters.numerationFrom` is `0`.
4. `namedParameters.targetMonthNumber` has any value except integers from 0 to 12.
