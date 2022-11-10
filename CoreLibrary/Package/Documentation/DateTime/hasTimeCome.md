# `hasTimeCome` - has time come

```
(targetDateTime: Date | string): boolean
```

Returns `true` if specified time has come, otherwise returns `false`.
Note that the reference date and time is the date and time of local machine, not the Greenwich time zone.


## Example

Below output to console is actual for 23 December 2022, 12:02:

```typescript
console.log(hasTimeCome("2022-12-23T12:02")); // -> true
console.log(hasTimeCome("2022-12-23T12:03")); // -> false
```

If to execute above code now in machine with correct date and time settings, all values will be `true`.
