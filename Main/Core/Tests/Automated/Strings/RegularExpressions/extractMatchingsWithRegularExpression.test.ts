import { extractMatchingsWithRegularExpression, Logger } from "../../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.suite(
    "Exactly one matching",
    async (): Promise<void> => {

      const experimentalSample: string = "Documentation/API/ConfigurationFile/Markup/MarkupProcessing.md#API--SECTION";

      await Promise.all([

        Testing.test(
          "Arrayed result is correct",
          (): void => {

            Assert.deepStrictEqual(
              extractMatchingsWithRegularExpression(experimentalSample, /#.+$/u),
              {
                updatedString: "Documentation/API/ConfigurationFile/Markup/MarkupProcessing.md",
                extractedMatchings: [ "#API--SECTION" ]
              }
            );

          }
        ),

        Testing.test(
          "Exactly on result is correct",
          (): void => {

            Assert.deepStrictEqual(
              extractMatchingsWithRegularExpression(
                experimentalSample,
                /#.+$/u,
                { mustExpectExactlyOneMatching: true }
              ),
              {
                updatedString: "Documentation/API/ConfigurationFile/Markup/MarkupProcessing.md",
                extractedMatching: "#API--SECTION"
              }
            );

          }
        )
      ]);

    }
  )

]).catch(Logger.logPromiseError);
