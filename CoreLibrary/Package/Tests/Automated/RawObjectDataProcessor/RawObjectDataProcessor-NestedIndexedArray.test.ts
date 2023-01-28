import { RawObjectDataProcessor, undefinedToEmptyArray } from "../../../Source";
import { deepEqual, strictEqual } from "assert";


describe("RawObjectDataProcessor: nested indexed array property", (): void => {

  describe("TypeCheck", (): void => {

    type ValidData = {
      foo: Array<number>;
    };

    const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
      nameForLogging: "ValidData",
      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
      properties: {
        foo: {
          required: true,
          type: Array,
          element: {
            type: Number,
            numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber
          }
        }
      }
    };

    const validDataSample: unknown = {
      foo: [ 1, 2 ]
    };

    const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
        RawObjectDataProcessor.process(validDataSample, validDataSpecification);

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
      strictEqual(
        undefinedToEmptyArray(validationErrorsMessages).length,
        0,
        undefinedToEmptyArray(validationErrorsMessages)[0]
      );
    });

    it("Output data matching with input data", (): void => {
      deepEqual(processedData, validDataSample);
    });
  });
});
