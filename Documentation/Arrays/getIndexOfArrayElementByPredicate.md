# `getIndexOfArrayElementByPredicate`: Retrieving of index of array element by predicate

```
function getIndexOfArrayElementByPredicate<ArrayElement>(
  targetArray: Array<ArrayElement>, predicate: (arrayElement: ArrayElement) => boolean
): number | null
```

Returns matching with `predicate` array's `targetArray` element index or `null` if no such element.

```typescript
type Product = { ID: number; title: string; price: number; };

const sample: Array<Product> = [
  { ID: 1, title: "ALPHA", price: 100 },
  { ID: 2, title: "BRAVO", price: 500 }
];

getIndexOfArrayElementByPredicate(sample, (product: Product): boolean => product.ID === 2) // => 1
getIndexOfArrayElementByPredicate(sample, (product: Product): boolean => product.ID === 3) // => null
```
