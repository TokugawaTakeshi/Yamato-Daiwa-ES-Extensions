import { createArrayOfNaturalNumbers, InvalidParameterValueError } from "../../../Source";
import Assert from "assert";


describe("createArrayOfNaturalNumbers", (): void => {

  describe("Normal scenarios", (): void => {

    describe("Ascending order", (): void => {
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 0 }), []);
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 1 }), [ 1 ]);
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 3 }), [ 1, 2, 3 ]);
    });

    describe("Descending order", (): void => {

      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 0, isDescendingOrder: true }), []);
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 1, isDescendingOrder: true }), [ 1 ]);
      Assert.deepStrictEqual(createArrayOfNaturalNumbers({ elementsCount: 3, isDescendingOrder: true }), [ 3, 2, 1 ]);

      Assert.deepStrictEqual(
        createArrayOfNaturalNumbers({ elementsCount: 0, isDescendingOrder: true, startingNumber: 2 }), []
      );
      Assert.deepStrictEqual(
        createArrayOfNaturalNumbers({ elementsCount: 1, isDescendingOrder: true, startingNumber: 2 }), [ 2 ]
      );
      Assert.deepStrictEqual(
        createArrayOfNaturalNumbers({ elementsCount: 3, isDescendingOrder: true, startingNumber: 4 }), [ 4, 3, 2 ]
      );

    });

  });

  describe("Errored scenarios", (): void => {

    it("Negative elements count", (): void => {

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: -1 }); },
        InvalidParameterValueError
      );

    });

    it("Fractional elements count", (): void => {

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 1.2 }); },
        InvalidParameterValueError
      );

    });

    it("Non-natural starting number", (): void => {

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: 0 }); },
        InvalidParameterValueError
      );

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: 1.2 }); },
        InvalidParameterValueError
      );

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 3, startingNumber: -3 }); },
        InvalidParameterValueError
      );

    });

    it("With descending order the starting number is less than elements count", (): void => {

      Assert.throws(
        (): void => { createArrayOfNaturalNumbers({ elementsCount: 5, startingNumber: 4, isDescendingOrder: true }); },
        InvalidParameterValueError
      );

    });

  });

});
