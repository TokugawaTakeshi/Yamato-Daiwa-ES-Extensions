"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeLastItemNumberForSpecificPaginationPage({ currentPageNumber, itemsCountPerPage, totalItemsCount }) {
    const lastItemNumberWhenCurrentPageIsFull = currentPageNumber * itemsCountPerPage;
    return lastItemNumberWhenCurrentPageIsFull > totalItemsCount ? totalItemsCount : lastItemNumberWhenCurrentPageIsFull;
}
exports.default = computeLastItemNumberForSpecificPaginationPage;
