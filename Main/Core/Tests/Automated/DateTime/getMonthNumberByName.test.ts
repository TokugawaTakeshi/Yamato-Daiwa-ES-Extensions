import { getMonthNumberByName, InvalidParameterValueError, Logger } from "../../../Source";
import { MonthsNames } from "fundamental-constants";
import { suite, test } from "node:test";
import Assert from "assert";


Promise.all([

  suite(
    "Normal Scenarios",
    async (): Promise<void> => {

      await Promise.all([

        test(
          "Numeration from 0",
          (): void => {
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.january, numerationFrom: 0 }), 0);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.february, numerationFrom: 0 }), 1);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.march, numerationFrom: 0 }), 2);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.april, numerationFrom: 0 }), 3);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.may, numerationFrom: 0 }), 4);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.june, numerationFrom: 0 }), 5);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.july, numerationFrom: 0 }), 6);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.august, numerationFrom: 0 }), 7);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.september, numerationFrom: 0 }), 8);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.october, numerationFrom: 0 }), 9);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.november, numerationFrom: 0 }), 10);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.december, numerationFrom: 0 }), 11);
          }
        ),

        test(
          "Numeration from 1",
          (): void => {
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.january, numerationFrom: 1 }), 1);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.february, numerationFrom: 1 }), 2);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.march, numerationFrom: 1 }), 3);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.april, numerationFrom: 1 }), 4);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.may, numerationFrom: 1 }), 5);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.june, numerationFrom: 1 }), 6);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.july, numerationFrom: 1 }), 7);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.august, numerationFrom: 1 }), 8);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.september, numerationFrom: 1 }), 9);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.october, numerationFrom: 1 }), 10);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.november, numerationFrom: 1 }), 11);
            Assert.strictEqual(getMonthNumberByName({ targetMonthName: MonthsNames.december, numerationFrom: 1 }), 12);
          }
        )

      ]);

    }
  ),

  suite(
    "Errored Scenarios",
    async (): Promise<void> =>

        test(
          "Invalid `numerationFrom` Option",
          (): void => {

            Assert.throws(
              (): void => { getMonthNumberByName({ targetMonthName: MonthsNames.june, numerationFrom: 2.3 }); },
              InvalidParameterValueError
            );

          }
        )

  )

]).catch(Logger.logPromiseError);
