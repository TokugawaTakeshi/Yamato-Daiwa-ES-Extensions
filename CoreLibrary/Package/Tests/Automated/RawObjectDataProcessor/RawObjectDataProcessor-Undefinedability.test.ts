import {
  RawObjectDataProcessor,
  Logger,
  type ArbitraryObject,
  undefinedToEmptyArray,
  toUpperCamelCase,
  explodeCasedPhraseToWords
} from "../../../Source";
import { suite, test } from "node:test";
import { deepEqual, strictEqual, notDeepEqual } from "assert";


suite(
  "Requirement",
  async (): Promise<void> => {

    await Promise.all(

      Object.values(RawObjectDataProcessor.ProcessingApproaches).map(

        async (processingApproach: RawObjectDataProcessor.ProcessingApproaches): Promise<void> =>

            suite(
              explodeCasedPhraseToWords(toUpperCamelCase(processingApproach)).join(" "),
              async (): Promise<void> => {

                await Promise.all([

                  suite(
                    "Undefined Property is Definitely Allowed or Forbidden",
                    async (): Promise<void> => {

                      const TARGET_PROPERTY_NAME: "alpha" = "alpha";
                      type ValidData = { [TARGET_PROPERTY_NAME]: number; };

                      const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                        nameForLogging: "ValidData",
                        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
                        properties: {
                          [TARGET_PROPERTY_NAME]: {
                            type: Number,
                            numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
                            isUndefinedForbidden: true,
                            isNullForbidden: true
                          },
                          bar: {
                            type: Number,
                            numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
                            isUndefinedForbidden: false,
                            isNullForbidden: true
                          }
                        }
                      };

                      await suite(
                        "Valid Data",
                        async (): Promise<void> => {

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

                          await test(
                            "Input Data is Valid as Expected",
                            (): void => {
                              strictEqual(isRawDataInvalid, false);
                            }
                          );

                          await test(
                            "No Validation Errors Messages as Expected",
                            (): void => {
                              strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
                            }
                          );

                          await test(
                            "Output Data is Even With Input Data as Expected",
                            (): void => {
                              deepEqual(processedData, generateConstantValidDataSample());
                            }
                          );

                        }
                      );

                      await suite(
                        "Invalid Data",
                        async (): Promise<void> => {

                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                            process({}, validDataSpecification, { processingApproach });

                          const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                          const validationErrorsMessages: ReadonlyArray<string> = processingResult.rawDataIsInvalid ?
                              processingResult.validationErrorsMessages : [];

                          await test(
                            "Input Data is Invalid as Expected",
                            (): void => {
                              strictEqual(isRawDataInvalid, true);
                            }
                          );

                          await test(
                            "Has Exactly One Validation Error Message as Expected",
                            (): void => {
                              strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
                            }
                          );

                          await test(
                            "Validation Error Message is Correct",
                            (): void => {
                              strictEqual(
                                undefinedToEmptyArray(validationErrorsMessages)[0],
                                RawObjectDataProcessor.generateValidationErrorMessage({
                                  ...RawObjectDataProcessor.defaultLocalization.validationErrors.
                                      forbiddenUndefinedValueOfProperty,
                                  targetPropertyDotSeparatedQualifiedInitialName: TARGET_PROPERTY_NAME,
                                  targetPropertyNewName: null,
                                  /* eslint-disable-next-line no-undefined --
                                   * It could be omitted, but the explicit `undefined` is better for readability of the tests
                                   *   for this case. */
                                  targetPropertyValue: undefined,
                                  targetPropertyValueSpecification: validDataSpecification.properties[TARGET_PROPERTY_NAME]
                                })
                              );
                            }
                          );

                        }
                      );

                    }
                  ),

                  suite(
                    "Undefined Value is Conditionally Forbidden",
                    async (): Promise<void> => {

                      const TARGET_PROPERTY_NAME: "swimmingPoolMaximalDepth__meters" = "swimmingPoolMaximalDepth__meters";
                      type ValidData = { hasSwimmingPool: boolean; [TARGET_PROPERTY_NAME]: number; };
                      const requirementConditionDescription: string = "`hasSwimmingPool` is true";

                      const validDataSpecification: RawObjectDataProcessor.FixedKeyAndValuesTypeObjectDataSpecification = {
                        nameForLogging: "ValidData",
                        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
                        properties: {
                          hasSwimmingPool: {
                            type: Boolean,
                            isUndefinedForbidden: false
                          },
                          [TARGET_PROPERTY_NAME]: {
                            type: Number,
                            numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
                            undefinedForbiddenIf: {
                              predicate: (rawData: ArbitraryObject): boolean => rawData.hasSwimmingPool === true,
                              descriptionForLogging: requirementConditionDescription
                            }
                          }
                        }
                      };

                      await suite(
                        "Valid Data",
                        async (): Promise<void> => {

                          function generateConstantValidDataSample(): ValidData {
                            return { hasSwimmingPool: true, swimmingPoolMaximalDepth__meters: 3 };
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

                          await test("Input Data is Valid as Expected", (): void => {
                            strictEqual(isRawDataInvalid, false);
                          });

                          await test("No Validation Errors Messages as Expected", (): void => {
                            strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
                          });

                          await test("Output Data is Even with Input Data as Expected", (): void => {
                            deepEqual(processedData, generateConstantValidDataSample());
                          });

                        }
                      );

                      await suite(
                        "Invalid Data",
                        async (): Promise<void> => {

                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                              process({ hasSwimmingPool: true }, validDataSpecification, { processingApproach });

                          const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                          const validationErrorsMessages: ReadonlyArray<string> = processingResult.rawDataIsInvalid ?
                              processingResult.validationErrorsMessages : [];

                          await test(
                            "Input Data is Invalid as Expected",
                              (): void => {
                                strictEqual(isRawDataInvalid, true);
                              }
                          );

                          await test(
                            "Has Exactly one Validation Error Message as Expected",
                            (): void => {
                              strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
                            }
                          );

                          await test(
                            "Validation Error Message is Correct",
                            (): void => {
                              strictEqual(
                                undefinedToEmptyArray(validationErrorsMessages)[0],
                                RawObjectDataProcessor.generateValidationErrorMessage({
                                  title: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                      conditionallyForbiddenUndefinedValue.title,
                                  description: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                      conditionallyForbiddenUndefinedValue.
                                      generateDescription({ conditionWhenUndefinedIsForbidden: requirementConditionDescription }),
                                  targetPropertyDotSeparatedQualifiedInitialName: TARGET_PROPERTY_NAME,
                                  targetPropertyNewName: null,
                                  /* eslint-disable-next-line no-undefined --
                                   * It could be omitted, but the explicit `undefined` is better for readability of the tests
                                   *   for this case. */
                                  targetPropertyValue: undefined,
                                  targetPropertyValueSpecification: validDataSpecification.properties[TARGET_PROPERTY_NAME]
                                })
                              );
                            }
                          );

                        }
                      );

                    }
                  ),

                  suite(
                    "Undefined Value Substitution",
                    async (): Promise<void> => {

                      type ValidData = { foo: string; };

                      function generateConstantDataSample(): Partial<ValidData> {
                        return {};
                      }

                      const TARGET_PROPERTY_DEFAULT_VALUE: string = "ALPHA";

                      const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                        nameForLogging: "Sample",
                        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
                        properties: {
                          foo: {
                            type: String,
                            undefinedValueSubstitution: TARGET_PROPERTY_DEFAULT_VALUE
                          }
                        }
                      };

                      const inputData: Partial<ValidData> = generateConstantDataSample();

                      const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                          process(inputData, validDataSpecification, { processingApproach });

                      const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                      let processedData: ValidData | undefined;

                      if ("processedData" in processingResult) {
                        processedData = processingResult.processedData;
                      }

                      await test(
                        "Default Value has been Substituted as Expected",
                        (): void => {
                          strictEqual(processedData?.foo, TARGET_PROPERTY_DEFAULT_VALUE);
                        }
                      );

                      await test(
                        "Input Data is Valid as Expected",
                        (): void => {
                          strictEqual(isRawDataInvalid, false);
                        }
                      );

                      await test(
                        "Output Data is not Even With Input Data as Expected",
                        (): void => {
                          notDeepEqual(processedData, generateConstantDataSample());
                        }
                      );

                      if (processingApproach === RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject) {

                        await test(
                          "Input data has been Changed",
                          (): void => {
                            notDeepEqual(inputData, generateConstantDataSample());
                          }
                        );

                      } else {

                        await test(
                          "Input data has not been Changed",
                          (): void => {
                            deepEqual(inputData, generateConstantDataSample());
                          }
                        );

                      }

                    }
                  ),

                  // TODO mustBeUndefineConditionally

                ]);

            }
          )

      )

    );

  }
).catch(Logger.logPromiseError);
