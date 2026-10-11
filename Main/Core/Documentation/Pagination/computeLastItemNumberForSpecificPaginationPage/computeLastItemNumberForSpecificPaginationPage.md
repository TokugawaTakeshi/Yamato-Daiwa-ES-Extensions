# `computeLastItemNumberForSpecificPaginationPage`: Compute last item number for specific pagination page

```
computeLastItemNumberForSpecificPaginationPage(
  namedParameters: {
    currentPageNumber: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
  }
): number
```

To compute it independently on first item number for specific pagination page, it's required to know below parameters:

* Current page number
* Items count per page
* Total items count

For example, when pagination has 20 items per page and total 25 items, the last item number for first page will be 20,
but for last one - 25.
