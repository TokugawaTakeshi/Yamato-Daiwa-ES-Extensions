# `roundUpToSpecificIntegerPlaceValue` - Rounds up the number to specific integer place value

```
(sourceData: Readonly<{ targetNumber: number; trailingZerosCount: number; }>): number
```

Rounds up the number to specific nearest integer place value.
For example, we can round up `15836`:

* To tens - it will be `15840`
* To hundreds - it will be `15900`
* To thousands - it will be `16000`
* To ten thousands - it will be `20000`

Herewith, the decimal part will be discarded.


## Examples

```typescript
const experimentalSample: number = 15836;

console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 1 })); // -> 15840
console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 2 })); // -> 15900
console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 3 })); // -> 16000
console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 4 })); // -> 20000
```

If specified `trailingZerosCount` is equal or more than digits count in `targetNumber`, the result will be same as if
  to specify the `trailingZerosCount` less by 1 that digits count in `targetNumber`:

```typescript
console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 5 })); // -> 20000
```
