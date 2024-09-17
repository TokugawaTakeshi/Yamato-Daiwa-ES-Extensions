# `getISO8601StringWithoutTimePart` - extract date part from ISO8601 string

Returns the [ISO8601 string](https://en.wikipedia.org/wiki/ISO_8601) including date part only.
Because the time zones is very tricky park of ECMAScript, it is required to ask you by the compound parameter
  which of local time and UTC time are you means for both input and output.

* If the passed parameter is the instance of native [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date),
  it will be converted to **ISO8601 string** without time part.
* If the passed parameter is **ISO8601 string**, time part will be removed.


```typescript
console.log(getISO8601StringWithoutTimePart("2013-03-10T02:00:00Z"), "2013-03-10")
```

In `"2013-03-10T02:00:00Z"` case returned value will be `"2013-03-10"`.

```typescript
console.log(getISO8601StringWithoutTimePart(new Date(2013, 11, 13)));
```

In above case, the returned value could be not `"2013-12-13"`.
In previous example (`"2013-03-10T02:00:00Z"`), `Z` refers to time zone respective **Zulu meridian** while 
`new Date(2013, 11, 13)` return the date and time for current time zone.
Thus, the return value depends on time zone of machine executed the JavaScript.


```typescript
console.log(getISO8601StringWithoutTimePart("2013-03-10"));
```

Nothing to remove from the string - `2013-03-10` will be returned.


```typescript
console.log(getISO8601StringWithoutTimePart("2013-03"));
```

The day of month is unknown - the `2013-03` will be returned.
Note that `new Date("2013-03").toISOString()` will append the date of month equals `1` and return value will start from
`2013-03-01`.


```typescript
console.log(getISO8601StringWithoutTimePart("2013-033-103T02:00:00Z"));
```

Above string is not valid ISO8601 string - the `InvalidParameterValueError` will be thrown.
