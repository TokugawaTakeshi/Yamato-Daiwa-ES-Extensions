import { createArrayOfNaturalNumbers, InvalidParameterValueError } from "../../../Source";
import Assert from "assert";


describe("createArrayOfNaturalNumbers", (): void => {

  it("Normal scenarios", (): void => {
    Assert.deepStrictEqual(createArrayOfNaturalNumbers(0), []);
    Assert.deepStrictEqual(createArrayOfNaturalNumbers(1), [ 1 ]);
    Assert.deepStrictEqual(createArrayOfNaturalNumbers(3), [ 1, 2, 3 ]);
  });

  it("Errored scenarios", (): void => {

    Assert.throws(
      (): void => {
        createArrayOfNaturalNumbers(-1);
      },
      InvalidParameterValueError
    );

    Assert.throws(
      (): void => {
        createArrayOfNaturalNumbers(1.2);
      },
      InvalidParameterValueError
    );

  });

});
