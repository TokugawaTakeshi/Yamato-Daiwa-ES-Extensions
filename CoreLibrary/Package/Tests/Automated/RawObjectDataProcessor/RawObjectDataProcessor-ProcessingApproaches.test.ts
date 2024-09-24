import { RawObjectDataProcessor } from "../../../Source";
import { suite, test } from "node:test";
import Assert from "assert";


(async (): Promise<void> => {

  await suite("Processing Approaches", async (): Promise<void> => {

    type Sample = {
      alpha: number;
      bravo: string;
      charlie: {
        charlie1: number;
        charlie2: string;
      };
      delta: boolean;
    };

    function generateAlwaysSameSample(): Sample {
      return {
        alpha: 1,
        bravo: "FOO",
        charlie: {
          charlie1: 2,
          charlie2: "BAR"
        },
        delta: true
      };
    }

    const validSampleSpecification: RawObjectDataProcessor.FixedKeyAndValuesTypeObjectDataSpecification = {
      nameForLogging: "Sample",
      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
      properties: {
        alpha: {
          type: Number,
          required: true,
          numbersSet: RawObjectDataProcessor.NumbersSets.naturalNumber
        },
        bravo: {
          type: String,
          required: true
        },
        charlie: {
          type: Object,
          required: true,
          properties: {
            charlie1: {
              type: Number,
              required: true,
              numbersSet: RawObjectDataProcessor.NumbersSets.naturalNumber
            },
            charlie2: {
              type: String,
              required: true
            }
          }
        }
      }
    };

    const sampleWhichMustMutate: Sample = generateAlwaysSameSample();

    const resultOfProcessingOfObjectWhichMustMutate: RawObjectDataProcessor.ProcessingResult<Sample> =
        RawObjectDataProcessor.process(
          sampleWhichMustMutate,
          validSampleSpecification,
          { processingApproach: RawObjectDataProcessor.ProcessingApproaches.existingObjectManipulation }
        );

    if (resultOfProcessingOfObjectWhichMustMutate.rawDataIsInvalid) {
      throw new Error(
        "Test has gone wrong: contrary to expectations, the `sampleWhichMustMutate` does not match " +
          "`validSampleSpecification`."
      );
    }


    const sampleWhichMustNotMutate: Sample = generateAlwaysSameSample();

    const resultOfProcessingOfObjectWhichMustNotMutate: RawObjectDataProcessor.ProcessingResult<Sample> =
        RawObjectDataProcessor.process(
          sampleWhichMustNotMutate,
          validSampleSpecification,
          { processingApproach: RawObjectDataProcessor.ProcessingApproaches.newObjectAssembling }
        );

    if (resultOfProcessingOfObjectWhichMustNotMutate.rawDataIsInvalid) {
      throw new Error(
          "Test has gone wrong: contrary to expectations, the `sampleWhichMustNotMutate` does not match " +
          "`validSampleSpecification`."
      );
    }


    const processedSampleWhichMustMutate: Sample = resultOfProcessingOfObjectWhichMustMutate.processedData;

    processedSampleWhichMustMutate.alpha = 3;
    processedSampleWhichMustMutate.bravo = "BAZ";
    processedSampleWhichMustMutate.charlie.charlie1 = 4;
    processedSampleWhichMustMutate.charlie.charlie2 = "HOGE";

    await test("Sample which must has been mutated with expected values", (): void => {

      const freshInstanceOfSample: Sample = generateAlwaysSameSample();

      Assert.notDeepEqual(sampleWhichMustMutate, freshInstanceOfSample);

      Assert.strictEqual(sampleWhichMustMutate.alpha, 3);
      Assert.strictEqual(sampleWhichMustMutate.bravo, "BAZ");
      Assert.strictEqual(sampleWhichMustMutate.charlie.charlie1, 4);
      Assert.strictEqual(sampleWhichMustMutate.charlie.charlie2, "HOGE");

    });

    await test("Sample which must not mutate has not mutated", (): void => {

      const freshInstanceOfSample: Sample = generateAlwaysSameSample();

      Assert.deepEqual(sampleWhichMustNotMutate, freshInstanceOfSample);

    });

  });

}

)().catch((error: unknown): void => { console.error(error); });
