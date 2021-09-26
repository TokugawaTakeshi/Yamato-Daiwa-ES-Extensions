# `separateEach4DigitsGroupWithComma`: Separate each 4 digits group with comma

```
separateEach4DigitsGroupWithComma(targetNumber: number | bigint | string): string
```

Some Eastern calculus system are oriented to 4-digits group, not to 3-digits group
(thousands, millions, billions, trillions etc).

```typescript
console.log(separateEach4DigitsGroupWithComma(12345)); // "1,2345"
console.log(separateEach4DigitsGroupWithComma("12345")); // "1,2345"
console.log(separateEach4DigitsGroupWithComma(BigInt("12345"))); // "1,2345"

console.log(separateEach4DigitsGroupWithComma(123456)); // "12,3456"
console.log(separateEach4DigitsGroupWithComma(1234567)); // "123,4567"
console.log(separateEach4DigitsGroupWithComma(12345678)); // "1234,5678"

console.log(separateEach4DigitsGroupWithComma(-34567)); // "-3,4567"
console.log(separateEach4DigitsGroupWithComma(-34568.45679)); // "-3,4568.4,5679"
console.log(separateEach4DigitsGroupWithComma("1.23456e+5")); // "1.2,3456e+5"

// MAX_SAFE_INTEGER excess:
console.log(separateEach3DigitsGroupWithComma(13000000000000007)); // "1,3000,0000,0000,0008" !
// Solution:
console.log(separateEach3DigitsGroupWithComma("13000000000000007")); // "1,3000,0000,0000,0007"
// Or:
console.log(separateEach3DigitsGroupWithComma(BitInt("13000000000000007"))); // "1,3000,0000,0000,0007"
```
