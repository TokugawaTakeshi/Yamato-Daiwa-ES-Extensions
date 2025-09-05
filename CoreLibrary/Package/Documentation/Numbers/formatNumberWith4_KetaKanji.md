# `formatNumberWith4_KetaKanji`: Format number with 4-digits Kanji (CJK Ideographic characters)

```
formatNumberWith4_KetaKanji(targetNumber: number | bigint | string): string
```

```typescript
console.log(formatNumberWith4_KetaKanji(12345)); // "1万2345"
console.log(formatNumberWith4_KetaKanji(123456)); // "12万3456"
console.log(formatNumberWith4_KetaKanji(1234567)); // "123万4567"
console.log(formatNumberWith4_KetaKanji(12345678)); // "1234万5678"

console.log(formatNumberWith4_KetaKanji(123456789)); // "1億2345万6789"
console.log(formatNumberWith4_KetaKanji(1234567890)); // "12億3456万7890"
console.log(formatNumberWith4_KetaKanji(12345678901)); // "123億4567万8901"
console.log(formatNumberWith4_KetaKanji(123456789012)); // "1234億5678万9012"

console.log(formatNumberWith4_KetaKanji(1234567890123)); // "1兆2345億6789万0123"
console.log(formatNumberWith4_KetaKanji(12345678901234)); // "12兆3456億7890万1234"
console.log(formatNumberWith4_KetaKanji(123456789012345)); // "123兆4567億8901万2345"
console.log(formatNumberWith4_KetaKanji(1234567890123456)); // "1234兆5678億9012万3456"

// MAX_SAFE_INTEGER excess:
console.log(formatNumberWith4_KetaKanji(12345678901234567)); // "1234兆5678億9012万3458" !! Last ditig is differs!
// Solution:
console.log(formatNumberWith4_KetaKanji(BigInt(12345678901234567)));　// 1京2345兆6789億0123万4567
// Or:
console.log(formatNumberWith4_KetaKanji(String(12345678901234567)));　// 1京2345兆6789億0123万4567

console.log(formatNumberWith4_KetaKanji(1234567890123456)); // -1234兆5678億9012万3456
console.log(formatNumberWith4_KetaKanji(-123456789.543)); // -1億2345万6789.543
```
