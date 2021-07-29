export default function computeLastItemNumberForSpecificPaginationPage({ currentPageNumber, itemsCountPerPage, totalItemsCount }) {
    const lastItemNumberWhenCurrentPageIsFull = currentPageNumber * itemsCountPerPage;
    return lastItemNumberWhenCurrentPageIsFull > totalItemsCount ? totalItemsCount : lastItemNumberWhenCurrentPageIsFull;
}
