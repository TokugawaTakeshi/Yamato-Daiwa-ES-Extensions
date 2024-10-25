import {
  RawObjectDataProcessor,
  undefinedToEmptyArray,
  rawObjectDataProcessorLocalization__english,
  Logger
} from "../../../Source";
import { suite, test } from "node:test";
import { deepEqual, strictEqual, notDeepEqual } from "assert";


suite("Requirement", async (): Promise<void> => {

  const validationErrorsMessagesBuilder: RawObjectDataProcessor.ValidationErrorsMessagesBuilder =
      new RawObjectDataProcessor.ValidationErrorsMessagesBuilder(rawObjectDataProcessorLocalization__english);

  await Promise.all(
    Object.values(RawObjectDataProcessor.ProcessingApproaches).map(
      async (processingApproach: RawObjectDataProcessor.ProcessingApproaches): Promise<void> =>
          suite(processingApproach, async (): Promise<void> => {
            await Promise.all([

              suite("Definitely Required/Optional Property", async (): Promise<void> => {

                const dataNameForLogging: string = "ValidData";
                const targetPropertyName: "alpha" = "alpha";
                type ValidData = { [targetPropertyName]: number; };

                const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
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

                await suite("Valid Data", async (): Promise<void> => {

                  function generateConstantValidDataSample(): ValidData {
                    return { alpha: 7 };
                  }

                  const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                      process(generateConstantValidDataSample(), validDataSpecification, { processingApproach });

                  const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                  let processedData: ValidData | undefined;
                  let validationErrorsMessages: ReadonlyArray<string> | undefined;

                  if ("processedData" in processingResult) {
                    processedData = processingResult.processedData;
                  } else {
                    validationErrorsMessages = processingResult.validationErrorsMessages;
                  }

                  await test("Input data is valid as expected", (): void => {
                    strictEqual(isRawDataInvalid, false);
                  });

                  await test("No validation errors messages as expected", (): void => {
                    strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
                  });

                  await test("Output data is even with input data as expected", (): void => {
                    deepEqual(processedData, generateConstantValidDataSample());
                  });

                });

                await suite("Invalid Data", async (): Promise<void> => {

                  const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                    process({ alpha: null }, validDataSpecification, { processingApproach });

                  const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                  const validationErrorsMessages: ReadonlyArray<string> = processingResult.rawDataIsInvalid ?
                      processingResult.validationErrorsMessages : [];

                  await test("Input data is invalid as expected", (): void => {
                    strictEqual(isRawDataInvalid, true);
                  });

                  await test("Has exactly one validation error message as expected", (): void => {
                    strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
                  });

                  await test("Validation error message is correct", (): void => {
                    strictEqual(
                      undefinedToEmptyArray(validationErrorsMessages)[0],
                      validationErrorsMessagesBuilder.buildNonNullableValueIsNullErrorMessage({
                        targetPropertyDotSeparatedQualifiedInitialName: `${ dataNameForLogging }.${ targetPropertyName }`,
                        targetPropertyNewName: null,
                        targetPropertyValue: null,
                        targetPropertyValueSpecification: validDataSpecification.properties[targetPropertyName]
                      })
                    );
                  });

                });

              }),

              suite("Nullable Value Substitution", async (): Promise<void> => {

                type ValidData = { foo: string; };

                function generateConstantDataSample(): { foo: string | null; } {
                  return { foo: null };
                }

                const TARGET_PROPERTY_DEFAULT_VALUE: string = "ALPHA";

                const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                  nameForLogging: "Sample",
                  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
                  properties: {
                    foo: {
                      type: String,
                      required: true,
                      nullSubstitution: TARGET_PROPERTY_DEFAULT_VALUE
                    }
                  }
                };

                const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                  process(generateConstantDataSample(), validDataSpecification, { processingApproach });

                const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                let processedData: ValidData | undefined;

                if ("processedData" in processingResult) {
                  processedData = processingResult.processedData;
                }

                await test("Default value has been substituted as expected", (): void => {
                  strictEqual(processedData?.foo, TARGET_PROPERTY_DEFAULT_VALUE);
                });

                await test("Input data is valid as expected", (): void => {
                  strictEqual(isRawDataInvalid, false);
                });

                await test("Output data is not even with input data as expected", (): void => {
                  notDeepEqual(processedData, generateConstantDataSample());
                });

              })

            ]);

          })
    )
  );

}).catch(Logger.logPromiseError);
