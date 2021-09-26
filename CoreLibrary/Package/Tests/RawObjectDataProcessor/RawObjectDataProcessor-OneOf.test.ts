import { RawObjectDataProcessor, undefinedToEmptyArray } from "../../Source";
import { deepEqual, strictEqual } from "assert";


describe("RawObjectProcessor: one of", (): void => {

  const dataNameForLogging: string = "ExperimentalSample";

  type ValidData = {
    rules: {
      blocks: "always" | "never" | false;
    };
  };

  const dataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {

    nameForLogging: dataNameForLogging,
    subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,

    properties: {

      rules: {

        required: true,
        type: Object,

        properties: {

          blocks: {

            required: true,
            type: RawObjectDataProcessor.ValuesTypesIDs.oneOf,

            alternatives: [
              {
                type: String,
                allowedAlternatives: [ "always", "never" ]
              },
              {
                type: Boolean,
                falseOnly: true
              }
            ]
          }
        }
      }
    }
  };


  describe("Valid data", (): void => {

    const validRawDataSamples: Array<ValidData> = [
      { rules: { blocks: "always" } },
      { rules: { blocks: "never" } },
      { rules: { blocks: false } }
    ];

    for (const validDataSample of validRawDataSamples) {

      const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
          RawObjectDataProcessor.process(validDataSample, dataSpecification);

      const rawDataIsInvalid: boolean = processingResult.rawDataIsInvalid;
      let processedData: ValidData | undefined;
      let validationErrorsMessages: Array<string> | undefined;

      if ("processedData" in processingResult) {
        processedData = processingResult.processedData;
      } else {
        validationErrorsMessages = processingResult.validationErrorsMessages;
      }

      it("Input data is valid", (): void => {
        strictEqual(rawDataIsInvalid, false);
      });

      it("No validation errors message", (): void => {
        strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
      });

      it("Output data matching with input data", (): void => {
        deepEqual(processedData, validDataSample);
      });
    }
  });
});
