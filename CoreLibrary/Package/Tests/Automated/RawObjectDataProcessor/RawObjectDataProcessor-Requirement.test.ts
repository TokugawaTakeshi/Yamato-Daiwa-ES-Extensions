import {
  RawObjectDataProcessor,
  undefinedToEmptyArray,
  rawObjectDataProcessorLocalization__english,
  type ArbitraryObject
} from "../../../Source";
import { suite, test } from "node:test";
import { deepEqual, notDeepEqual, strictEqual } from "assert";


(async (): Promise<void> => {

  await suite("Requirement", async (): Promise<void> => {

    const validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder =
      new RawObjectDataProcessor.ValidationErrorsMessagesBuilder(rawObjectDataProcessorLocalization__english);

    await suite("Definitely Required/Optional Object Property", async (): Promise<void> => {

      const dataNameForLogging: string = "ValidData";
      const targetPropertyName: "alpha" = "alpha";
      type ValidData = { [targetPropertyName]: number; };

      const dataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
        nameForLogging: dataNameForLogging,
        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
        properties: {
          [targetPropertyName]: {
            type: Number,
            numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
            required: true
          },
          bar: {
            type: Number,
            numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
            required: false
          }
        }
      };

      await suite("Valid data", async (): Promise<void> => {

        const validDataSample: unknown = { alpha: 7 };

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

        await test("Input data is valid", (): void => {
          strictEqual(rawDataIsInvalid, false);
        });

        await test("No validation errors messages", (): void => {
          strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
        });

        await test("Output data is even with input data", (): void => {
          deepEqual(processedData, validDataSample);
        });

      });

      await suite("Invalid data", async (): Promise<void> => {

        const invalidDataSample: unknown = {};

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

        await test("Input data is invalid", (): void => {
          strictEqual(rawDataIsInvalid, true);
        });

        await test("Has exactly one validation error message", (): void => {
          strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
        });

        await test("Validation error message is correct", (): void => {
          strictEqual(
            undefinedToEmptyArray(validationErrorsMessages)[0],
            validationErrorsMessagesBuilder.buildRequiredPropertyIsMissingErrorMessage({
              targetPropertyDotSeparatedQualifiedName: `${ dataNameForLogging }.${ targetPropertyName }`,
              targetPropertyNewName: null,
              /* eslint-disable-next-line no-undefined -- It could be omitted, but the explicit 'undefined' is better
               *    for readability of the tests for this case. */
              targetPropertyValue: undefined,
              targetPropertyValueSpecification: dataSpecification.properties[targetPropertyName]
            })
          );
        });

        await test("Processed data is not even raw data", (): void => {
          notDeepEqual(processedData, invalidDataSample);
        });

      });

    });

    await suite("Conditionally required property", async (): Promise<void> => {

      const dataNameForLogging: string = "ValidData";
      const targetPropertyName: "swimmingPoolMaximalDepth__meters" = "swimmingPoolMaximalDepth__meters";
      type ValidData = { hasSwimmingPool: boolean; [targetPropertyName]: number; };
      const requirementConditionDescription: string = "'hasSwimmingPool' is true";

      const dataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
        nameForLogging: dataNameForLogging,
        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
        properties: {
          hasSwimmingPool: {
            type: Boolean,
            required: false
          },
          [targetPropertyName]: {
            type: Number,
            numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
            requiredIf: {
              predicate(rawData: ArbitraryObject): boolean {
                return rawData.hasSwimmingPool === true;
              },
              descriptionForLogging: requirementConditionDescription
            }
          }
        }
      };


      await suite("Valid data", async (): Promise<void> => {

        const validDataSample: unknown = { hasSwimmingPool: true, swimmingPoolMaximalDepth__meters: 3 };

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

        await test("Input data is valid", (): void => {
          strictEqual(rawDataIsInvalid, false);
        });

        await test("No validation errors messages", (): void => {
          strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
        });

        await test("Output data is even with input data", (): void => {
          deepEqual(processedData, validDataSample);
        });

      });

      await suite("Invalid data", async (): Promise<void> => {

        const invalidDataSample: unknown = { hasSwimmingPool: true };

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

        await test("Input data is invalid", (): void => {
          strictEqual(rawDataIsInvalid, true);
        });

        await test("Has exactly one validation error message", (): void => {
          strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
        });

        await test("Validation error message is correct", (): void => {
          strictEqual(
            undefinedToEmptyArray(validationErrorsMessages)[0],
            validationErrorsMessagesBuilder.
                buildConditionallyRequiredPropertyIsMissingWhileRequirementConditionSatisfiedErrorMessage({
                  targetPropertyDotSeparatedQualifiedName: `${ dataNameForLogging }.${ targetPropertyName }`,
                  targetPropertyNewName: null,
                  /* eslint-disable-next-line no-undefined -- It could be omitted, but the explicit 'undefined' is better
                   *    for readability of the tests for this case. */
                  targetPropertyValue: undefined,
                  targetPropertyValueSpecification: dataSpecification.properties[targetPropertyName],
                  requirementConditionDescription
                })
          );
        });

        await test("Processed data is not even raw data", (): void => {
          notDeepEqual(processedData, invalidDataSample);
        });

      });

    });

    await suite("Default value substitution", async (): Promise<void> => {

      type ValidData = {
        foo: string;
      };

      const sample: unknown = {};
      const defaultValue: string = "ALPHA";

      const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
        nameForLogging: "Example",
        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
        properties: {
          foo: {
            type: String,
            defaultValue: "ALPHA"
          }
        }
      };

      const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
          RawObjectDataProcessor.process(sample, validDataSpecification);

      const rawDataIsInvalid: boolean = processingResult.rawDataIsInvalid;
      let processedData: ValidData | undefined;
      let validationErrorsMessages: Array<string> | undefined;

      if ("processedData" in processingResult) {
        processedData = processingResult.processedData;
      } else {
        validationErrorsMessages = processingResult.validationErrorsMessages;
      }

      await test("Default value has been substituted", (): void => {
        strictEqual(processedData?.foo, defaultValue);
      });

      await test("Input data is valid", (): void => {
        strictEqual(rawDataIsInvalid, false);
      });

      await test("No validation errors messages", (): void => {
        strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
      });

      await test("Output data is NOT even with input data", (): void => {
        notDeepEqual(processedData, sample);
      });

    });

  });

  }

)().catch((error: unknown): void => { console.error(error); });
