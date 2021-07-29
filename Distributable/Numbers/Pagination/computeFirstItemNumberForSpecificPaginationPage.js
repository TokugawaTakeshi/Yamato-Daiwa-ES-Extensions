export default function computeFirstItemNumberForSpecificPaginationPage({ currentPageNumber, itemsCountPerPage }) {
    return ((currentPageNumber - 1) + itemsCountPerPage) + 1;
}
