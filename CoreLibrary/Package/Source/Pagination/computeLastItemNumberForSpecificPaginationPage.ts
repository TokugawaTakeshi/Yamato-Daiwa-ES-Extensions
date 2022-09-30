export default function computeLastItemNumberForSpecificPaginationPage(
  {
    currentPageNumber,
    itemsCountPerPage,
    totalItemsCount
  }: Readonly<{
    currentPageNumber: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
  }>
): number {
  const lastItemNumberWhenCurrentPageIsFull: number = currentPageNumber * itemsCountPerPage;
  return lastItemNumberWhenCurrentPageIsFull > totalItemsCount ? totalItemsCount : lastItemNumberWhenCurrentPageIsFull;
}
