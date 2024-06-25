import {
  RawObjectDataProcessor,
  undefinedToEmptyArray,
  rawObjectDataProcessorLocalization__english
} from "../../../Source";
import { deepEqual, notDeepEqual, strictEqual } from "assert";


describe("RawObjectProcessor: number property", (): void => {

  describe("Type check", (): void => {

    const dataNameForLogging: string = "ValidData";
    const targetPropertyName: "alpha" = "alpha";
    type ValidData = { [targetPropertyName]: number; };

    const targetValueSpecification: RawObjectDataProcessor.NumberPropertySpecification = {
      type: Number,
      numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
      required: true
    };

    const dataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
      nameForLogging: dataNameForLogging,
      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
      properties: {
        [targetPropertyName]: targetValueSpecification
      }
    };

    const validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder =
        new RawObjectDataProcessor.ValidationErrorsMessagesBuilder(rawObjectDataProcessorLocalization__english);


    describe("Valid data", (): void => {

      const validDataSample: unknown = { [targetPropertyName]: 6 };
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

    describe("Invalid data", (): void => {

      const targetPropertyInvalidValue: string = "Not a number";
      const invalidDataSample: unknown = { [targetPropertyName]: targetPropertyInvalidValue };
      const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
          RawObjectDataProcessor.process(invalidDataSample, dataSpecification);

      const rawDataIsInvalid: boolean = processingResult.rawDataIsInvalid;
      let processedData: ValidData | undefined;
      let validationErrorsMessages: Array<string> | undefined;

      if ("processedData" in processingResult) {
        processedData = processingResult.processedData;
      } else {
        validationErrorsMessages = processingResult.validationErrorsMessages;
      }


      it("Confirmed that data is invalid", (): void => {
        strictEqual(rawDataIsInvalid, true);
      });

      it("Has exactly one validation error message", (): void => {
        strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
      });

      it("Validation error message is correct", (): void => {
        strictEqual(
          undefinedToEmptyArray(validationErrorsMessages)[0],
          validationErrorsMessagesBuilder.buildValueTypeDoesNotMatchWithExpectedErrorMessage({
            targetPropertyDotSeparatedQualifiedName: `${ dataNameForLogging }.${ targetPropertyName }`,
            targetPropertyNewName: null,
            targetPropertyValue: targetPropertyInvalidValue,
            targetPropertyValueSpecification: targetValueSpecification,
            targetPropertyStringifiedValueBeforeFirstPreValidationModification: targetPropertyInvalidValue
          })
        );
      });

      it("Processed data is not even raw data", (): void => {
        notDeepEqual(processedData, invalidDataSample);
      });
    });
  });

  describe("Numbers sets", (): void => {

    describe("Natural", (): void => {

      describe("Valid data", (): void => {
        // ...
      });
    });
  });
});
