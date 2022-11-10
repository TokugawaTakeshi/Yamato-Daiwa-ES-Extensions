# `getDaysCountOfPeriod` - get days count of specified period

```
(
  namedParameters: Readonly<{
    datesOrTimeMoments: [ Date | string, Date | string ];
    mustCountIncompleteDay: boolean;
  }>
): number
```

Returns the days count (full or not - depending on dedicated option) of specified time period.

* The date period must be specified via tuple of two elements.
* Logically, if earliest date will go first, but it is not categorical
* The dates of period could be specified via [native `Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
  or ISO8601 format.


## Thrown errors
### `InvalidParameterValueError`

Will be thrown if one or both dates of target period are invalid.


## Examples

```typescript
getDaysCountOfPeriod({
  datesOrTimeMoments: [ "2011-10-05T15:00:00.000Z", "2011-10-07T15:00:00.000Z" ],
  mustCountIncompleteDay: true
})
```

In above case, the specified period is exact, so the returned value will be `2` regardless of `mustCountIncompleteDay`
  option.


```typescript
getDaysCountOfPeriod({
  datesOrTimeMoments: [ "2011-10-05T15:00:00.000Z", "2011-10-07T16:00:00.000Z" ],
  mustCountIncompleteDay: true
})
```

In above case, we have 2 days and 1 hour period.
With `mustCountIncompleteDay: true` the returned value will be `3`, while with `mustCountIncompleteDay: false` - `2`.


```typescript
getDaysCountOfPeriod({
  datesOrTimeMoments: [ "2011-10-05T15:00:00.000Z", "2011-10-073T16:002:00.000Z" ],
  mustCountIncompleteDay: true
});
```

It is barely noticeable, but the date definition in above example has the mistake
  (day of month and minutes amount in the second date).
`InvalidParameterValueError` will be thrown.
