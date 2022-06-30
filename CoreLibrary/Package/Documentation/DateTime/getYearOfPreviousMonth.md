# `getYearOfPreviousMonth` - get year of previous month

Returns the year of previous month in relation to specified year and month number (from 0 or 1).
Except January case, the returned year will be even with specified parameter one.

```
getYearOfPreviousMonth(
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
  getYearOfPreviousMonth({
    referenceYear: 2022,
    referenceMonthNumber__numerationFrom0: 5
  })
); // => 2022

console.log(
  getYearOfPreviousMonth({
    referenceYear: 2022,
    referenceMonthNumber__numerationFrom0: 0
  })
); // => 2021

console.log(
  getYearOfPreviousMonth({
    referenceYear: 2022,
    referenceMonthNumber__numerationFrom1: 1
  })
); // => 2021
```
