import { getMatchingWithFirstRegularExpressionCapturingGroup, UnexpectedEventError } from "../../../../Source";
import Assert from "assert";


describe("getMatchingWithFirstRegularExpressionCapturingGroup", (): void => {

  describe("Normal scenario", (): void => {

    const experimentalSample: string = "path/to/file.html#intro";

    it("With \"global\" flag", (): void => {

      Assert.strictEqual(
        getMatchingWithFirstRegularExpressionCapturingGroup({
          targetString: experimentalSample,
          regularExpression: /#(?<hash>.+)$/gu
        }),
        "intro"
      );

    });

    it("Without \"global\" flag", (): void => {

      Assert.strictEqual(
        getMatchingWithFirstRegularExpressionCapturingGroup({
          targetString: experimentalSample,
          regularExpression: /#(?<hash>.+)$/u
        }),
        "intro"
      );

    });

  });

  describe("More than one matching", (): void => {

    const experimentalSample: string = "Uzbekistan, Dagestan, Armenia, Turkmenistan, Georgia";
    const regularExpression: RegExp = /(?<suffix>\w+stan)/gu;

    it("Returning of null", (): void => {

      Assert.strictEqual(
        getMatchingWithFirstRegularExpressionCapturingGroup({
          targetString: experimentalSample,
          regularExpression
        }),
        null
      );

    });

    it("Throwing of error", (): void => {

      Assert.throws(
        (): void => {
          getMatchingWithFirstRegularExpressionCapturingGroup({
            targetString: experimentalSample,
            regularExpression,
            mustThrowErrorIfZeroOrMoreThanOneMatchings: true
          });
        },
        UnexpectedEventError
      );

    });

  });

});
