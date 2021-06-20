# `separateEach3DigitsGroupWithComma`: Separate each 3 digits group with comma

```
separateEach3DigitsGroupWithComma(targetNumber: number | bigint | string): string
```

```typescript
console.log(separateEach3DigitsGroupWithComma(1234)); // "1,234"
console.log(separateEach3DigitsGroupWithComma("1234")); // "1,234"
console.log(separateEach3DigitsGroupWithComma(BigInt("1234"))); // "1,234"

console.log(separateEach3DigitsGroupWithComma(12345)); // "12,345"
console.log(separateEach3DigitsGroupWithComma(123456)); // "123,456"
console.log(separateEach3DigitsGroupWithComma(1234567)); // "1,234,567"

console.log(separateEach3DigitsGroupWithComma(-3456)); // "-3,456"
console.log(separateEach3DigitsGroupWithComma(-3456.4567)); // "-3,456.4,567"
console.log(separateEach3DigitsGroupWithComma("1.23456e+5")); // "1.23,456e+5"

// MAX_SAFE_INTEGER excess:
console.log(separateEach3DigitsGroupWithComma(13000000000000007)); // "13,000,000,000,000,008" !
// Solution:
console.log(separateEach3DigitsGroupWithComma("13000000000000007")); // "13,000,000,000,000,007"
// Or:
console.log(separateEach3DigitsGroupWithComma(BitInt("13000000000000007"))); // "13,000,000,000,000,007"
```
