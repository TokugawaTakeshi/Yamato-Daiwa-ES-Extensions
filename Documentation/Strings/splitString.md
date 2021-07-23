# `splitString`: exploding of the string to array of compounds

Works as native [`String.prototype.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
and even using it under certain conditions, but supports the surrogate pairs.

```typescript
const sample: string = "😀😃😁😆";

console.log(sample.split(""));
/* Output:
[
  '�', '�', '�',
  '�', '�', '�',
  '�', '�'
]
 */

console.log(splitString(sample, "")); // => [ '😀', '😃', '😁', '😆' ]
```
