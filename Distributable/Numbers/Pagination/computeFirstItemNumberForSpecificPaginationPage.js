"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeFirstItemNumberForSpecificPaginationPage({ currentPageNumber, itemsCountPerPage }) {
    return ((currentPageNumber - 1) + itemsCountPerPage) + 1;
}
exports.default = computeFirstItemNumberForSpecificPaginationPage;
