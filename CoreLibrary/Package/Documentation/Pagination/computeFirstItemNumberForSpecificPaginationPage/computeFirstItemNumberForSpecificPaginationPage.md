# `computeFirstItemNumberForSpecificPaginationPage`: Compute first item number for specific pagination page

```
computeFirstItemNumberForSpecificPaginationPage(
  namedParameters: {
    currentPageNumber: number;
    itemsCountPerPage: number;
  }
): number
```

To compute it, it's required to know the **current page number** and **items count per pagination page**.
For example, when pagination has 20 items per page, the first item number in page 2 will be 21.


## Example

```typescript
console.log(computeFirstItemNumberForSpecificPaginationPage({
  currentPageNumber: 1,
  itemsCountPerPage: 30
})); // => 1


console.log(computeFirstItemNumberForSpecificPaginationPage({
  currentPageNumber: 2,
  itemsCountPerPage: 30
})); // => 31

console.log(computeFirstItemNumberForSpecificPaginationPage({
  currentPageNumber: 3,
  itemsCountPerPage: 30
})); // => 61
```
