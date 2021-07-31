export default function computeLastItemNumberForSpecificPaginationPage(
  {
    currentPageNumber,
    itemsCountPerPage,
    totalItemsCount
  }: {
    currentPageNumber: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
  }
): number {
  const lastItemNumberWhenCurrentPageIsFull: number = currentPageNumber * itemsCountPerPage;
  return lastItemNumberWhenCurrentPageIsFull > totalItemsCount ? totalItemsCount : lastItemNumberWhenCurrentPageIsFull;
}
