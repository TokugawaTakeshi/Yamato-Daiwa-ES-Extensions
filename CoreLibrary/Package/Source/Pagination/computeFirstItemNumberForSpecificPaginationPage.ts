export default function computeFirstItemNumberForSpecificPaginationPage(
  {
    currentPageNumber,
    itemsCountPerPage
  }: {
    currentPageNumber: number;
    itemsCountPerPage: number;
  }
): number {
  return (itemsCountPerPage * (currentPageNumber - 1)) + 1;
}
