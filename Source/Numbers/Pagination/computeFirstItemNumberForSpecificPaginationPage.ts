export default function computeFirstItemNumberForSpecificPaginationPage(
  {
    currentPageNumber,
    itemsCountPerPage
  }: {
    currentPageNumber: number;
    itemsCountPerPage: number;
  }
): number {
  return ((currentPageNumber - 1) + itemsCountPerPage) + 1;
}
