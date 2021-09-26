import { RawObjectDataProcessor, undefinedToEmptyArray } from "../../Source";
import { deepEqual, strictEqual } from "assert";


describe("RawObjectDataProcessor: nested object property", (): void => {

  describe("Type check", (): void => {

    type ValidData = {
      alpha1: {
        alpha2: number;
        bravo2: string;
      };
    };

    const dataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
      nameForLogging: "ValidData",
      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
      properties: {
        alpha1: {
          required: true,
          type: Object,
          properties: {
            alpha2: {
              required: true,
              type: Number,
              numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber
            },
            bravo2: {
              required: true,
              type: String
            }
          }
        }
      }
    };

    const validDataSample: unknown = {
      alpha1: {
        alpha2: 7,
        bravo2: "foo"
      }
    };

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
  });
});
