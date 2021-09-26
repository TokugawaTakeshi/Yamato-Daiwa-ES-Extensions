import computeFirstItemNumberForSpecificPaginationPage
  from "../../Source/Pagination/computeFirstItemNumberForSpecificPaginationPage";

import { strictEqual } from "assert";


describe("computeFirstItemNumberForSpecificPaginationPage", (): void => {

  it("Works as expected", (): void => {

    strictEqual(computeFirstItemNumberForSpecificPaginationPage({
      currentPageNumber: 1,
      itemsCountPerPage: 30
    }), 1);

    strictEqual(computeFirstItemNumberForSpecificPaginationPage({
      currentPageNumber: 2,
      itemsCountPerPage: 30
    }), 31);

    strictEqual(computeFirstItemNumberForSpecificPaginationPage({
      currentPageNumber: 3,
      itemsCountPerPage: 30
    }), 61);

    strictEqual(computeFirstItemNumberForSpecificPaginationPage({
      currentPageNumber: 4,
      itemsCountPerPage: 30
    }), 91);
  });
});
