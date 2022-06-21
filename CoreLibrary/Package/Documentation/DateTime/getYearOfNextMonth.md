# `getYearOfNextMonth` - get year of next month

Returns the year of next month in relation to specified year and month number (from 0 or 1).
Except December case, the returned year will be even with specified parameter one.

```
getYearOfNextMonth(
  namedParameters:
      Readonly<
        { referenceYear: number; } &
        (
          { referenceMonthNumber__numerationFrom0: number; } |
          { referenceMonthNumber__numerationFrom1: number; }
        )
      >
): number
```

## Examples

```typescript
console.log(
  getYearOfNextMonth({
    referenceYear: 2022,
    referenceMonthNumber__numerationFrom0: 5
  })
); // => 2022

console.log(
    getYearOfNextMonth({
      referenceYear: 2022,
      referenceMonthNumber__numerationFrom0: 11
    })
); // => 2023

console.log(
    getYearOfNextMonth({
      referenceYear: 2022,
      referenceMonthNumber__numerationFrom1: 12
    })
); // => 2023
```
