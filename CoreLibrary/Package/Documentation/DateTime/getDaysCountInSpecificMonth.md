# `getDaysCountInSpecificMonth` - retrieving of days count in specific month

```
(
  namedParameters: Readonly<
    { year: number; } &
    (
      { monthNumber__numerationFrom0: number; } |
      { monthNumber__numerationFrom1: number; }
    )
  >
): number
```

Returns days count in specified year and month.
The numeration of months could begin from `0` (`parametersObject.monthNumber__numerationFrom0`) or `1`
  (`parametersObject.monthNumber__numerationFrom1`);

```typescript
/* November 2021 (30 days) */
console.log(getDaysCountInSpecificMonth({ year: 2021, monthNumber__numerationFrom1: 11 }));   // -> 30
console.log(getDaysCountInSpecificMonth({ year: 2021, monthNumber__numerationFrom0: 10 }));   // -> 30

/* December 2021 (31 days) */
console.log(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom1: 12 }));   // -> 31
console.log(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom0: 11 }));   // -> 31

/* February 2022 (28 days) */
console.log(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom1: 2 }));    // -> 28
console.log(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom0: 1 }));    // -> 28
```
