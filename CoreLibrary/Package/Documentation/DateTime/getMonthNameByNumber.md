# `getMonthNameByNumber`

```
getMonthNameByNumber(
  parametersObject: { targetMonthNumber: number; numerationFrom: number; }
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

1. `parametersObject.numerationFrom` is neither `0` nor `1`.
2. Both `parametersObject.targetMonthNumber` is `0` while `parametersObject.numerationFrom` is `1`.
3. Both `parametersObject.targetMonthNumber` is `12` while `parametersObject.numerationFrom` is `0`.
4. `parametersObject.targetMonthNumber` is exceeding `12`.
