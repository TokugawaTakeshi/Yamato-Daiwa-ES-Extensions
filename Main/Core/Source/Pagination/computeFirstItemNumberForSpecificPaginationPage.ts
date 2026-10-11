export default function computeFirstItemNumberForSpecificPaginationPage(
  {
    currentPageNumber,
    itemsCountPerPage
  }: Readonly<{
    currentPageNumber: number;
    itemsCountPerPage: number;
  }>
): number {
  return (itemsCountPerPage * (currentPageNumber - 1)) + 1;
}
