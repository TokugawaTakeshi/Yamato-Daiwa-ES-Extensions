import { millisecondsToSeconds } from "../../../Source";
import Assert from "assert";


describe("millisecondsToSeconds", (): void => {

  const samples: ReadonlyArray<{ millisecondsAmount: number; secondsAmount: number; }> = [
    { millisecondsAmount: 5, secondsAmount: 0.005 },
    { millisecondsAmount: 50, secondsAmount: 0.05 },
    { millisecondsAmount: 500, secondsAmount: 0.5 },
    { millisecondsAmount: 1000, secondsAmount: 1 },
    { millisecondsAmount: 2000, secondsAmount: 2 }
  ];

  for (const sample of samples) {
    it(`${ sample.millisecondsAmount } milliseconds is ${ sample.secondsAmount } seconds`, (): void => {
      Assert.strictEqual(millisecondsToSeconds(sample.millisecondsAmount), sample.secondsAmount);
    });
  }

});
