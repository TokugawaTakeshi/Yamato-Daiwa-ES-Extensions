# `hasDateCome` - has date come

```
(targetDate: Date | string): boolean
```

Returns `true` if specified date has come, otherwise returns `false`.
Although the dates (specified and current one) wihtout time is being compared, the time zone is matters:
  the current date refers to the date and time of local machine which could differ from the date at Greenwich time zone.


## Example

Below output to console is actual for 23 December 2022:

```typescript
console.log(hasDateCome("2022-12-22")); // -> true
console.log(hasDateCome("2022-12-23")); // -> true
console.log(hasDateCome("2022-12-24")); // -> false
```

If to execute above code now in machine with correct date and time settings, all values will be `true`.
