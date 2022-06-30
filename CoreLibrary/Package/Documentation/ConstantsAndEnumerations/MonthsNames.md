# MonthsNames enumeration

Allows to refer to the month by name, not by number what usually confusing with numeration from 0.

```typescript
enum MonthsNames {
  january = "JANUARY",
  february = "FEBRUARY",
  march = "MARCH",
  april = "APRIL",
  may = "MAY",
  june = "JUNE",
  july = "JULY",
  august = "AUGUST",
  september = "SEPTEMBER",
  october = "OCTOBER",
  november = "NOVEMBER",
  december = "DECEMBER"
}
```

If you need lower case or capitalize first character, use dedicated functionality:

```typescript
console.log(MonthsNames.january.toLowerCase()); // "january"
console.log(capitalizeFirstCharacter(MonthsNames.january.toLowerCase())); // "January"
```
