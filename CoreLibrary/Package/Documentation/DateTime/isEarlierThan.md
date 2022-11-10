# `isEarlierThan`

Returns `true` if the target date and time is earlier than the reference one, herewith the time could be respected or ignored.

```
(
  sourceData: Readonly<{
    targetDateTime: Date | string;
    referenceDateTime: Date | string;
    mustIgnoreTime: boolean;
  }>
): boolean
```

## Errors

`InvalidParameterValueError` will be thrown if `targetDateTime` and/or `referenceDateTime` are invalid.


## Examples

```typescript
console.log(
  isEarlierThan({
    targetDateTime: "05 October 2011 14:00 UTC",
    referenceDateTime: "05 October 2011 15:00 UTC",
    mustIgnoreTime: false
  })
)
```

Although the days of month are matching, the times are different.
So, in this case the `targetDateTime` is earlier than `referenceDateTime`.
Because the `mustIgnoreTime` has been set to `true`, the return value will be `true`.

```typescript
console.log(
  isEarlierThan({
    targetDateTime: "05 October 2011 14:00 UTC",
    referenceDateTime: "05 October 2011 15:00 UTC",
    mustIgnoreTime: true
  })
)
```

Same dates, but now the time will be ignoring.
If to compare only the dates, the `targetDateTime` is NOT earlier that `referenceDateTime` thus the returned value will `false`.

```typescript
console.log(
  isEarlierThan({
    targetDateTime: "05 October 2011 14:00 UTC",
    referenceDateTime: "05 October 2011 14:00 UTC",
    mustIgnoreTime: true
  })
)
```

Now, the `targetDateTime` and `referenceDateTime` are even.
Regardless to time respecting, the `targetDateTime` is NOT earlier than `referenceDateTime` so the returned value will be `false`.
