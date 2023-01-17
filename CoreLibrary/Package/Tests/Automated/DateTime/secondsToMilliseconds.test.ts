import { secondsToMilliseconds } from "../../../Source";
import Assert from "assert";


describe("secondsToMilliseconds", (): void => {

  const samples: ReadonlyArray<{ millisecondsAmount: number; secondsAmount: number; }> = [
    { secondsAmount: 0.005, millisecondsAmount: 5 },
    { secondsAmount: 0.05, millisecondsAmount: 50 },
    { secondsAmount: 0.5, millisecondsAmount: 500 },
    { secondsAmount: 1, millisecondsAmount: 1000 },
    { secondsAmount: 2, millisecondsAmount: 2000 }
  ];

  for (const sample of samples) {
    it(`${ sample.secondsAmount } seconds is ${ sample.millisecondsAmount } seconds`, (): void => {
      Assert.strictEqual(secondsToMilliseconds(sample.secondsAmount), sample.millisecondsAmount);
    });
  }

});
