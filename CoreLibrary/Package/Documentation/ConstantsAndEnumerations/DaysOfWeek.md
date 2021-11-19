# `DaysOfWeek`

Allows to refer to the day of week by name, not by number what usually confusing with numeration from 0 (and also,
first day of week is country-dependent).

```typescript
enum DaysOfWeek {
  sunday = "SUNDAY",
  monday = "MONDAY",
  tuesday = "TUESDAY",
  wednesday = "WEDNESDAY",
  thursday = "THURSDAY",
  friday = "FRIDAY",
  saturday = "SATURDAY"
}
```

If you need lower case or capitalize first character, use dedicated functionality:

```typescript
console.log(DaysOfWeek.sunday.toLowerCase()); // "sunday"
console.log(capitalizeFirstCharacter(DaysOfWeek.sunday.toLowerCase())); // "Sunday"
```
