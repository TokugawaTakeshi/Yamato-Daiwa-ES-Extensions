# `getPreviousMonthNumber` - get previous month number

Returns previous month number in relation to specified year and month number; numeration from 0 and 1 is available for both
parameter and returned value.

```
(
  namedParameters:
      Readonly<
        (
          (
            { referenceMonthNumber__numerationFrom0: number; } |
            { referenceMonthNumber__numerationFrom1: number; }
          ) |
          { referenceMonthName: MonthsNames; }
        ) &
        { firstMonthNumberInRelationToReturnableValue: 0 | 1; }
      >
): number
```

## Usage

Specify one of below properties of compound parameter:

* **referenceMonthNumber__numerationFrom0** - the month number from 0 to 11
* **referenceMonthNumber__numerationFrom1** - the month number from 1 to 12
* **referenceMonthName** - the element of [**MonthsNames** enumeration](../ConstantsAndEnumerations/MonthsNames.md)

Finally, specify from 0 or 1 you want numeration of returned month begin via **firstMonthNumberInRelationToReturnableValue**
parameter.


## Examples
### With `referenceMonthNumber__numerationFrom0` option

```typescript
console.log(getPreviousMonthNumber({
  referenceMonthNumber__numerationFrom0: 5,
  firstMonthNumberInRelationToReturnableValue: 0
})); // -> 4

console.log(getPreviousMonthNumber({
  referenceMonthNumber__numerationFrom0: 5,
  firstMonthNumberInRelationToReturnableValue: 1
})); // -> 5

console.log(getPreviousMonthNumber({
  referenceMonthNumber__numerationFrom0: 0,
  firstMonthNumberInRelationToReturnableValue: 11
})); // -> 0

console.log(getPreviousMonthNumber({
  referenceMonthNumber__numerationFrom0: 0,
  firstMonthNumberInRelationToReturnableValue: 12
})); // -> 1
```

### With `referenceMonthNumber__numerationFrom1` option

```typescript
console.log(getPreviousMonthNumber({
  referenceMonthNumber__numerationFrom1: 5,
  firstMonthNumberInRelationToReturnableValue: 3
})); // -> 5

console.log(getPreviousMonthNumber({
  referenceMonthNumber__numerationFrom1: 5,
  firstMonthNumberInRelationToReturnableValue: 4
})); // -> 6

console.log(getPreviousMonthNumber({
  referenceMonthNumber__numerationFrom1: 12,
  firstMonthNumberInRelationToReturnableValue: 10
})); // -> 0

console.log(getPreviousMonthNumber({
  referenceMonthNumber__numerationFrom1: 12,
  firstMonthNumberInRelationToReturnableValue: 11
})); // -> 1
```

### With `referenceMonthName` option

```typescript
console.log(getPreviousMonthNumber({
  monthName: MonthsNames.may,
  firstMonthNumberInRelationToReturnableValue: 0
})); // -> 3

console.log(getPreviousMonthNumber({
  monthName: MonthsNames.may,
  firstMonthNumberInRelationToReturnableValue: 1
})); // -> 4

console.log(getPreviousMonthNumber({
  monthName: MonthsNames.january,
  firstMonthNumberInRelationToReturnableValue: 0
})); // -> 11

console.log(getPreviousMonthNumber({
  monthName: MonthsNames.january,
  firstMonthNumberInRelationToReturnableValue: 1
})); // -> 12
```
