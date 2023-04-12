import { computeFirstItemNumberForSpecificPaginationPage } from "../../../Source";
import Assert from "assert";


describe("computeFirstItemNumberForSpecificPaginationPage", (): void => {

  it("Works as expected", (): void => {

    Assert.strictEqual(computeFirstItemNumberForSpecificPaginationPage({
      currentPageNumber: 1,
      itemsCountPerPage: 30
    }), 1);

    Assert.strictEqual(computeFirstItemNumberForSpecificPaginationPage({
      currentPageNumber: 2,
      itemsCountPerPage: 30
    }), 31);

    Assert.strictEqual(computeFirstItemNumberForSpecificPaginationPage({
      currentPageNumber: 3,
      itemsCountPerPage: 30
    }), 61);

    Assert.strictEqual(computeFirstItemNumberForSpecificPaginationPage({
      currentPageNumber: 4,
      itemsCountPerPage: 30
    }), 91);

  });

});
