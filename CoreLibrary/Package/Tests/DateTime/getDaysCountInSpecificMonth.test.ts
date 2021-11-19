import { getDaysCountInSpecificMonth } from "../../Source";
import { strictEqual } from "assert";


describe("getDaysCountInSpecificMonth", (): void => {

  it("30 days month", (): void => {
    strictEqual(getDaysCountInSpecificMonth({ year: 2021, monthNumber__numerationFrom1: 11 }), 30);
    strictEqual(getDaysCountInSpecificMonth({ year: 2021, monthNumber__numerationFrom0: 10 }), 30);
  });

  it("31 days month", (): void => {
    strictEqual(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom1: 12 }), 31);
    strictEqual(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom0: 11 }), 31);
  });

  it("28 days month", (): void => {
    strictEqual(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom1: 2 }), 28);
    strictEqual(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom0: 1 }), 28);
  });
});
