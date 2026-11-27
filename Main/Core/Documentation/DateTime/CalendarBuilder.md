# `CalendarBuilder` class

To display all days of any month of any year, you need **6 rows × 7 columns = 42 cells** table.
Each cell will include the data (number of day in month) — mostly of current month, but maybe also 
  the last days of previous month and/or first days of next month.
You may want to display them if developing the calendar for the GUI application, or just compute something
  based on these days — anyway first you need the array of above numbers, and this is on what `CalendarBuilder`
  specialized.


## Public Static Methods
### `generateDataFor42DaysMatrix`

```
(
  compoundParameter: 
      { targetYear: number; } &
      (
        { targetMonthNumber__numerationFrom0: number; } |
        { targetMonthNumber__numerationFrom1: number; } |
        { targetMonthName: MonthsNames; }
      ) &
      (
        { firstDayOfWeek__numerationFrom0ForSunday: number; } |
        { firstDayOfWeek__numerationFrom1ForSunday: number; } |
        { firstDayOfWeek: DaysOfWeekNames; }
      )
) => 
    Array<{
      year: number;
      monthNumber__numerationFrom0: number;
      monthNumber__numerationFrom1: number;
      monthName: MonthsNames;
      dayOfMonth: number;
      dayOfWeekName: DaysOfWeekNames;
      dayOfWeekNumber__numerationFrom0ForSunday: number;
    }>
```

Returns the array with data of **42** dates for specified year, month and first day of week
  (not all countries has Sunday as standardized first day of week).
The data for each date (has `CalendarBuilder.CalendarCellData` type) includes the year, month, day of month and day of 
  week represented with difference forms.


### `generateDataFor6x7DaysMatrix`

```
(
  compoundParameter: 
      { targetYear: number; } &
      (
        { targetMonthNumber__numerationFrom0: number; } |
        { targetMonthNumber__numerationFrom1: number; } |
        { targetMonthName: MonthsNames; }
      ) &
      (
        { firstDayOfWeek__numerationFrom0ForSunday: number; } |
        { firstDayOfWeek__numerationFrom1ForSunday: number; } |
        { firstDayOfWeek: DaysOfWeekNames; }
      )
) => 
    Array<
      Array<{
        year: number;
        monthNumber__numerationFrom0: number;
        monthNumber__numerationFrom1: number;
        monthName: MonthsNames;
        dayOfMonth: number;
        dayOfWeekName: DaysOfWeekNames;
        dayOfWeekNumber__numerationFrom0ForSunday: number;
      }>
    >
```

Returns same data as `generateDataFor42DaysMatrix` but exploded to **6** arrays of **7** elements corresponding to 
  calendar cells.
