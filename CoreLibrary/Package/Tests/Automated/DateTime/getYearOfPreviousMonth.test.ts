import { getYearOfPreviousMonth } from "../../../Source";
import Assert from "assert";


describe("getYearOfPreviousMonth", (): void => {

  type ExperimentalSample = Readonly<{
    monthNumber__numerationFrom0: number;
    monthNumber__numerationFrom1: number;
    yearOfPreviousMonth: number;
  }>;

  const referenceYear: number = 2022;

  const experimentalSamples: Array<ExperimentalSample> = [
    { monthNumber__numerationFrom0: 0, monthNumber__numerationFrom1: 1, yearOfPreviousMonth: referenceYear - 1 },
    { monthNumber__numerationFrom0: 1, monthNumber__numerationFrom1: 2, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 2, monthNumber__numerationFrom1: 3, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 3, monthNumber__numerationFrom1: 4, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 4, monthNumber__numerationFrom1: 5, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 5, monthNumber__numerationFrom1: 6, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 6, monthNumber__numerationFrom1: 7, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 7, monthNumber__numerationFrom1: 8, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 8, monthNumber__numerationFrom1: 9, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 9, monthNumber__numerationFrom1: 10, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 10, monthNumber__numerationFrom1: 11, yearOfPreviousMonth: referenceYear },
    { monthNumber__numerationFrom0: 11, monthNumber__numerationFrom1: 12, yearOfPreviousMonth: referenceYear }
  ];

  it("All results are matching with expected", (): void => {

    for (const experimentalSample of experimentalSamples) {

      Assert.strictEqual(
        getYearOfPreviousMonth({
          referenceYear,
          referenceMonthNumber__numerationFrom0: experimentalSample.monthNumber__numerationFrom0
        }),
        experimentalSample.yearOfPreviousMonth
      );

      Assert.strictEqual(
        getYearOfPreviousMonth({
          referenceYear,
          referenceMonthNumber__numerationFrom1: experimentalSample.monthNumber__numerationFrom1
        }),
        experimentalSample.yearOfPreviousMonth
      );

    }

  });

});
