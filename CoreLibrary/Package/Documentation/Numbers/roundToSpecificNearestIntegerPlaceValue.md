# `roundToSpecificNearestIntegerPlaceValue` - Round the number to specific nearest integer place value

```
(sourceData: Readonly<{ targetNumber: number; trailingZerosCount: number; }>): number
```

Rounds the number to specific nearest integer place value.
For example, we can round `15836`:

* To tens; it will be `15840` because the `15840` is closer than `15830`
* To hundreds; it will be `15800` because the `15800` is closer than `15900`
* To thousands; it will be `16000` because the `16000` is closer than `15000` 
* To ten thousands; it will be `20000` because the `20000` is closer than `10000`

Herewith, the decimal part will be discarded.


## Examples

Based on above explanations, the code will be:

```typescript
const experimentalSample: number = 15836;

console.log(roundToSpecificNearestIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 1 })); // -> 15840
console.log(roundToSpecificNearestIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 2 })); // -> 15800
console.log(roundToSpecificNearestIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 3 })); // -> 16000
console.log(roundToSpecificNearestIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 4 })); // -> 20000
```

If specified `trailingZerosCount` is equal or more than digits count in `targetNumber`, the result will be same as if
  to specify the `trailingZerosCount` less by 1 that digits count in `targetNumber`:


```typescript
console.log(roundToSpecificNearestIntegerPlaceValue({ targetNumber: experimentalSample, trailingZerosCount: 5 })); // -> 20000
```
