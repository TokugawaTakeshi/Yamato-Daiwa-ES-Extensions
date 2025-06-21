import { getMatchingWithFirstRegularExpressionCapturingGroup, UnexpectedEventError } from "../../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


await suite("getMatchingWithFirstRegularExpressionCapturingGroup", async (): Promise<void> => {

  await suite("Normal scenario", async (): Promise<void> => {

    const experimentalSample: string = "path/to/file.html#intro";

    await test("With \"global\" flag", (): void => {
      Assert.strictEqual(
        getMatchingWithFirstRegularExpressionCapturingGroup(experimentalSample, /#(?<hash>.+)$/gu),
        "intro"
      );
    });

    await test("Without \"global\" flag", (): void => {
      Assert.strictEqual(
        getMatchingWithFirstRegularExpressionCapturingGroup(experimentalSample, /#(?<hash>.+)$/u),
        "intro"
      );
    });

  });

  await suite("More than one matching", async (): Promise<void> => {

    const experimentalSample: string = "Uzbekistan, Dagestan, Armenia, Turkmenistan, Georgia";
    const regularExpression: RegExp = /(?<suffix>\w+stan)/gu;

    await test("Returning of null", (): void => {
      Assert.strictEqual(
        getMatchingWithFirstRegularExpressionCapturingGroup(experimentalSample, regularExpression),
        null
      );
    });

    await test("Throwing of error", (): void => {

      Assert.throws(
        (): void => {
          getMatchingWithFirstRegularExpressionCapturingGroup(
            experimentalSample, regularExpression, { mustExpectAtLeastOneMatching: true }
          );
        },
        UnexpectedEventError
      );

    });

  });

});
