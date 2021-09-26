# `getIndexesOfArrayElementsWhichSatisfiesToPredicate`: Retrieving of indexes of array elements which satisfied to predicate

```
getIndexesOfArrayElementsWhichSatisfiesToPredicate<ArrayElement>(
  targetArray: Array<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): Array<number>
```

Returns the array of indexes of elements of array `targetArray` which are satisfies to `predicate` function.

```typescript
type Product = { title: string; price: number; };

const sample1: Array<Product> = [
  { title: "ALPHA", price: 100 },
  { title: "BRAVO", price: 500 },
  { title: "CHARLIE", price: 1000 },
  { title: "DELTA", price: 1500 }
];

getIndexesOfArrayElementsWhichSatisfiesToPredicate(
  sample1, (arrayElement: Product): boolean => arrayElement.price > 500
); // => Expected output: [ 2, 3 ]

getIndexesOfArrayElementsWhichSatisfiesToPredicate(
    sample1, (arrayElement: Product): boolean => arrayElement.price > 1500
); // => Expected output: []
```
