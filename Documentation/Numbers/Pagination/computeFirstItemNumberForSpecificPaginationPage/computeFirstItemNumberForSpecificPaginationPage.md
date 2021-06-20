# `computeFirstItemNumberForSpecificPaginationPage`: Compute first item number for specific pagination page

```
function computeFirstItemNumberForSpecificPaginationPage(
  parametersObject: {
    currentPageNumber: number;
    itemsCountPerPage: number;
  }
): number
```

To compute it, it's required to know the **current page number** and **items count per pagination page**.
For example, when pagination has 20 items per page, the first item number in page 2 will be 21.
