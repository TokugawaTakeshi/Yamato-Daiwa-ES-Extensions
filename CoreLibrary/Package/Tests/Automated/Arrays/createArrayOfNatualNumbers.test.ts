import Assert from "assert";
import { createArrayOfNatualNumbers } from "../../../Source";


describe("createArrayOfNatualNumbers", (): void => {

  it("Works as expected", (): void => {
    Assert.deepStrictEqual(createArrayOfNatualNumbers(1), [ 1 ]);
    Assert.deepStrictEqual(createArrayOfNatualNumbers(3), [ 1, 2, 3 ]);
  });

});
