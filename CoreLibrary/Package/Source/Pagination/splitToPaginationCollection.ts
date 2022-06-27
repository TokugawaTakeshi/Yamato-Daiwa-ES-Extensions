export type PaginationCollection<Element> = {
  [key: number]: Array<Element> | undefined;
  getItemsForPage: (targetPageNumber: number) => Array<Element>;
  readonly pagesCount: number;
};


export default function splitToPaginationCollection<Element>(
  flatArray: Array<Element>,
  options: {
    itemsCountPerPaginationPage: number;
    pagesNumerationFrom: 0 | 1;
  }
): PaginationCollection<Element> {

  const pagesCount: number = Math.ceil(flatArray.length / options.itemsCountPerPaginationPage);

  const paginationCollection: PaginationCollection<Element> = {
    pagesCount,
    getItemsForPage(targetPageNumber: number): Array<Element> {
      const itemsForTargetPage: Array<Element> | undefined = this[targetPageNumber];
      return typeof itemsForTargetPage === "undefined" ? [] : itemsForTargetPage;
    }
  };

  let elementStartingPositionForCurrentPage: number = 0;
  let elementEndingPositionForCurrentPage: number = options.itemsCountPerPaginationPage;

  const lastPageNumber: number = options.pagesNumerationFrom === 0 ? pagesCount : pagesCount + 1;

  for (let pageNumber: number = options.pagesNumerationFrom; pageNumber < lastPageNumber; pageNumber++) {

    paginationCollection[pageNumber] = flatArray.slice(
      elementStartingPositionForCurrentPage, elementEndingPositionForCurrentPage
    );

    elementStartingPositionForCurrentPage = elementStartingPositionForCurrentPage + options.itemsCountPerPaginationPage;
    elementEndingPositionForCurrentPage = elementStartingPositionForCurrentPage + options.itemsCountPerPaginationPage;
  }

  return paginationCollection;
}
