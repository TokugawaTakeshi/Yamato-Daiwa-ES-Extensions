import Assert from "assert";
import { extractMatchingsWithRegularExpression, UnexpectedEventError } from "../../../../Source";


describe("extractMatchingsWithRegularExpression.test", (): void => {

  describe("Exactly one matching", (): void => {

    const experimentalSample: string = "Documentation/API/ConfigurationFile/Markup/MarkupProcessing.md#API--SECTION";

    it("Arrayed result is correct", (): void => {

      Assert.deepStrictEqual(
        extractMatchingsWithRegularExpression(experimentalSample, /#.+$/u),
        {
          updatedString: "Documentation/API/ConfigurationFile/Markup/MarkupProcessing.md",
          extractedMatchings: [ "#API--SECTION" ]
        }
      );

    });

    it("Exactly on result is correct", (): void => {

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

    });

  });

  describe("Multiple matching", (): void => {

    const experimentalSample: string = "Induction in India, the Hindustan, the Indian subcontinent";

    it("Arrayed result is correct", (): void => {

      Assert.deepStrictEqual(
        extractMatchingsWithRegularExpression(experimentalSample, /ind\w+\s/ui),
        {
          updatedString: "Documentation/API/ConfigurationFile/Markup/MarkupProcessing.md",
          extractedMatchings: [ "Induction ", "India ", "industan ", "Indian " ]
        }
      );

    });

    it("Exactly on result is correct", (): void => {

      Assert.throws(
        (): void => {
          extractMatchingsWithRegularExpression(
            experimentalSample,
            /ind\w+\s/ui,
            { mustExpectExactlyOneMatching: true }
          );
        },
        UnexpectedEventError
      );

      Assert.throws(
        (): void => {
          extractMatchingsWithRegularExpression(
            experimentalSample,
            /ind\w+\s/ui,
            { mustExpectOneOrZeroMatchings: true }
          );
        },
        UnexpectedEventError
      );

    });

  });


});
