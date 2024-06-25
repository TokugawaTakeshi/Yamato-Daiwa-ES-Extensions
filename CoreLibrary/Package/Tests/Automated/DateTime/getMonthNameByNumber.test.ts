import { getMonthNameByNumber, InvalidParameterValueError } from "../../../Source";
import { MonthsNames } from "fundamental-constants";
import Assert from "assert";


describe("getMonthNameByNumber", (): void => {

  describe("Normal scenarios", (): void => {

    it("Numeration from 0", (): void => {

      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 0, numerationFrom: 0 }), MonthsNames.january);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 1, numerationFrom: 0 }), MonthsNames.february);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 2, numerationFrom: 0 }), MonthsNames.march);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 3, numerationFrom: 0 }), MonthsNames.april);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 4, numerationFrom: 0 }), MonthsNames.may);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 5, numerationFrom: 0 }), MonthsNames.june);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 6, numerationFrom: 0 }), MonthsNames.july);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 7, numerationFrom: 0 }), MonthsNames.august);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 8, numerationFrom: 0 }), MonthsNames.september);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 9, numerationFrom: 0 }), MonthsNames.october);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 10, numerationFrom: 0 }), MonthsNames.november);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 11, numerationFrom: 0 }), MonthsNames.december);

    });

    it("Numeration from 1", (): void => {

      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 1, numerationFrom: 1 }), MonthsNames.january);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 2, numerationFrom: 1 }), MonthsNames.february);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 3, numerationFrom: 1 }), MonthsNames.march);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 4, numerationFrom: 1 }), MonthsNames.april);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 5, numerationFrom: 1 }), MonthsNames.may);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 6, numerationFrom: 1 }), MonthsNames.june);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 7, numerationFrom: 1 }), MonthsNames.july);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 8, numerationFrom: 1 }), MonthsNames.august);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 9, numerationFrom: 1 }), MonthsNames.september);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 10, numerationFrom: 1 }), MonthsNames.october);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 11, numerationFrom: 1 }), MonthsNames.november);
      Assert.strictEqual(getMonthNameByNumber({ targetMonthNumber: 12, numerationFrom: 1 }), MonthsNames.december);

    });

  });

  describe("Errored scenarios", (): void => {

    it("Invalid \"numerationFrom\" option", (): void => {

      Assert.throws(
        (): void => { getMonthNameByNumber({ targetMonthNumber: 1, numerationFrom: 2.3 }); },
        InvalidParameterValueError
      );

    });

    it("Specified months numbers are out of range", (): void => {

      Assert.throws(
        (): void => { getMonthNameByNumber({ targetMonthNumber: 12, numerationFrom: 0 }); },
        InvalidParameterValueError
      );

      Assert.throws(
        (): void => { getMonthNameByNumber({ targetMonthNumber: 0, numerationFrom: 1 }); },
        InvalidParameterValueError
      );

    });

    it("Specified months numbers are invalid", (): void => {

      Assert.throws(
        (): void => { getMonthNameByNumber({ targetMonthNumber: -2, numerationFrom: 1 }); },
        InvalidParameterValueError
      );

      Assert.throws(
        (): void => { getMonthNameByNumber({ targetMonthNumber: 2.3, numerationFrom: 1 }); },
        InvalidParameterValueError
      );

    });

  });

});
