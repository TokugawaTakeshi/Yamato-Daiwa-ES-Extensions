import { getDaysCountInSpecificMonth, Logger } from "../../../Source";
import Assert from "assert";
import { test } from "node:test";


Promise.all([

  test(
    "30 Days Month",
    (): void => {
      Assert.strictEqual(getDaysCountInSpecificMonth({ year: 2021, monthNumber__numerationFrom1: 11 }), 30);
      Assert.strictEqual(getDaysCountInSpecificMonth({ year: 2021, monthNumber__numerationFrom0: 10 }), 30);
    }
  ),

  test(
    "31 Days Month",
    (): void => {
      Assert.strictEqual(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom1: 12 }), 31);
      Assert.strictEqual(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom0: 11 }), 31);
    }
  ),

  test(
    "28 Days Month",
    (): void => {
      Assert.strictEqual(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom1: 2 }), 28);
      Assert.strictEqual(getDaysCountInSpecificMonth({ year: 2022, monthNumber__numerationFrom0: 1 }), 28);
    }
  )

]).catch(Logger.logPromiseError);
