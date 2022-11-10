import { getDaysCountOfPeriod, InvalidParameterValueError } from "../../../Source";
import Assert from "assert";


describe("getDaysCountOfPeriod", (): void => {

  it("Exact days count has been processed correctly", (): void => {

    for (let experimentNumber: number = 1; experimentNumber <= 2; experimentNumber++) {
      Assert.strictEqual(
        getDaysCountOfPeriod({
          datesOrTimeMoments: [ "2011-10-05T15:00:00.000Z", "2011-10-07T15:00:00.000Z" ],
          mustCountIncompleteDay: experimentNumber === 1
        }),
        2
      );
    }

  });

  it("Fractional days count has been processed correctly", (): void => {

    for (let experimentNumber: number = 1; experimentNumber <= 2; experimentNumber++) {
      Assert.strictEqual(
        getDaysCountOfPeriod({
          datesOrTimeMoments: [ "2011-10-05T15:00:00.000Z", "2011-10-07T16:00:00.000Z" ],
          mustCountIncompleteDay: experimentNumber === 1
        }),
        experimentNumber === 1 ? 3 : 2
      );
    }

  });

  it("Invalid date has been detected", (): void => {

    for (let experimentNumber: number = 1; experimentNumber <= 2; experimentNumber++) {

      Assert.throws(
      (): void => {
          getDaysCountOfPeriod({
            datesOrTimeMoments: [ "2011-10-05T15:00:00.000Z", "2011-10-073T16:002:00.000Z" ],
            mustCountIncompleteDay: true
          });
        },
        InvalidParameterValueError
      );

    }

  });

});
