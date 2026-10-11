import { computeFirstItemNumberForSpecificPaginationPage, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Testing.test(
  "Works as expected",
  (): void => {

    Assert.strictEqual(
      computeFirstItemNumberForSpecificPaginationPage({
        currentPageNumber: 1,
        itemsCountPerPage: 30
      }),
      1
    );

    Assert.strictEqual(
      computeFirstItemNumberForSpecificPaginationPage({
        currentPageNumber: 2,
        itemsCountPerPage: 30
      }),
      31
    );

    Assert.strictEqual(
      computeFirstItemNumberForSpecificPaginationPage({
        currentPageNumber: 3,
        itemsCountPerPage: 30
      }),
      61
    );

    Assert.strictEqual(
      computeFirstItemNumberForSpecificPaginationPage({
        currentPageNumber: 4,
        itemsCountPerPage: 30
      }),
      91
    );

  }
).catch(Logger.logPromiseError);
