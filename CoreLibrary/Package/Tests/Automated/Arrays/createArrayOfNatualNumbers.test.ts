import { createArrayOfNatualNumbers, InvalidParameterValueError } from "../../../Source";
import Assert from "assert";


describe("createArrayOfNatualNumbers", (): void => {

  it("Normal scenarios", (): void => {
    Assert.deepStrictEqual(createArrayOfNatualNumbers(0), []);
    Assert.deepStrictEqual(createArrayOfNatualNumbers(1), [ 1 ]);
    Assert.deepStrictEqual(createArrayOfNatualNumbers(3), [ 1, 2, 3 ]);
  });

  it("Errored scenarios", (): void => {

    Assert.throws(
      (): void => {
        createArrayOfNatualNumbers(-1);
      },
      InvalidParameterValueError
    );

    Assert.throws(
      (): void => {
        createArrayOfNatualNumbers(1.2);
      },
      InvalidParameterValueError
    );

  });

});
