# `getNextMonthNumber` - get next month number

Returns next month number in relation to specified year and month number; numeration from 0 and 1 is available for both 
parameter and returned value.

```
getNextMonthNumber(
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
console.log(getNextMonthNumber({
  referenceMonthNumber__numerationFrom0: 5,
  firstMonthNumberInRelationToReturnableValue: 0
})); // => 6

console.log(getNextMonthNumber({
  referenceMonthNumber__numerationFrom0: 5,
  firstMonthNumberInRelationToReturnableValue: 1
})); // => 7

console.log(getNextMonthNumber({
  referenceMonthNumber__numerationFrom0: 11,
  firstMonthNumberInRelationToReturnableValue: 0
})); // => 0

console.log(getNextMonthNumber({
  referenceMonthNumber__numerationFrom0: 11,
  firstMonthNumberInRelationToReturnableValue: 1
})); // => 1
```

### With `referenceMonthNumber__numerationFrom1` option

```typescript
console.log(getNextMonthNumber({
  referenceMonthNumber__numerationFrom1: 5,
  firstMonthNumberInRelationToReturnableValue: 0
})); // => 5

console.log(getNextMonthNumber({
  referenceMonthNumber__numerationFrom1: 5,
  firstMonthNumberInRelationToReturnableValue: 1
})); // => 6

console.log(getNextMonthNumber({
  referenceMonthNumber__numerationFrom1: 12,
  firstMonthNumberInRelationToReturnableValue: 0
})); // => 0

console.log(getNextMonthNumber({
  referenceMonthNumber__numerationFrom1: 12,
  firstMonthNumberInRelationToReturnableValue: 1
})); // => 1
```

### With `referenceMonthName` option

```typescript
console.log(getNextMonthNumber({
  monthName: MonthsNames.may,
  firstMonthNumberInRelationToReturnableValue: 0
})); // => 5

console.log(getNextMonthNumber({
  monthName: MonthsNames.may,
  firstMonthNumberInRelationToReturnableValue: 1
})); // => 6

console.log(getNextMonthNumber({
  monthName: MonthsNames.december,
  firstMonthNumberInRelationToReturnableValue: 0
})); // => 0

console.log(getNextMonthNumber({
  monthName: MonthsNames.december,
  firstMonthNumberInRelationToReturnableValue: 1
})); // => 1
```
