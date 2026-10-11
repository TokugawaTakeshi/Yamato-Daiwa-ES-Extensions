# `getMonthNumberByName` - get month number by number

```
(
  namedParameters: Readonly<{ targetMonthName: MonthsNames; numerationFrom: number; }>
): number
```

Converts the element of [MonthsNames](./../ConstantsAndEnumerations/MonthsNames.md) enumeration to number of
  month (from 0 or 1).

## Examples

```typescript
console.log(getMonthNumberByName({ targetMonthName: MonthsNames.january, numerationFrom: 0 })); // => 0
console.log(getMonthNumberByName({ targetMonthName: MonthsNames.january, numerationFrom: 1 })); // => 1

console.log(getMonthNumberByName({ targetMonthName: MonthsNames.december, numerationFrom: 0 })); // => 11
console.log(getMonthNumberByName({ targetMonthName: MonthsNames.december, numerationFrom: 1 })); // => 12
```


## Errors

Throws `InvalidParameterValueError` if `parametersObject.numerationFrom` is neither `0` nor `1`.
