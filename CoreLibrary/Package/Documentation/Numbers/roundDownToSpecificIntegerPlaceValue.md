# `roundDownToSpecificIntegerPlaceValue` - Rounds down the number to specific integer place value

```
(sourceData: Readonly<{ targetNumber: number; trailingZerosCount: number; }>): number
```

Rounds up the number to specific nearest integer place value.
For example, we can down round `15836`:

* To tens - it will be `15830`
* To hundreds - it will be `15800`
* To thousands - it will be `15000`
* To ten thousands - it will be `10000`

Herewith, the decimal part will be discarded.


## Examples

```typescript
const experimentalSample: number = 15836;

console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 1 })); // -> 15830
console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 2 })); // -> 15800
console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 3 })); // -> 15000
console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 4 })); // -> 10000
```

If specified `trailingZerosCount` is equal or more than digits count in `targetNumber`, the result will be same as if
  to specify the `trailingZerosCount` less by 1 that digits count in `targetNumber`:

```typescript
console.log(roundDownToSpecificIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 5 })); // -> 10000
```
