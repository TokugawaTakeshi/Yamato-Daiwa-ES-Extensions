# `roundToSpecifiedNearestDecimalPlaceValue` - round to specified nearest decimal place value

Rounds the number until specific decimal place (tens, hundreds, thousands, etc.).
Unlike it, native **Math.round()** rounds to nearest integer.

```
roundToSpecifiedNearestDecimalPlaceValue(
  namedParameters: { 
    targetNumber: number; 
    digitsAfterDecimalPoint: number; 
  }
): number
```

## Examples

### Rounding to tens 

```typescript
console.log(roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.11, digitsAfterDecimalPoint: 1 })); // => 1.1
console.log(roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.15, digitsAfterDecimalPoint: 1 })); // => 1.2
console.log(roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.19, digitsAfterDecimalPoint: 1 })); // => 1.2
```


### Rounding to hundreds

```typescript
console.log(roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.111, digitsAfterDecimalPoint: 2 })); // => 1.11
console.log(roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.115, digitsAfterDecimalPoint: 2 })); // => 1.12
console.log(roundToSpecifiedNearestDecimalPlaceValue({ targetNumber: 1.119, digitsAfterDecimalPoint: 2 })); // => 1.12
```
