import {
  RawObjectDataProcessor,
  Logger,
  type ArbitraryObject,
  undefinedToEmptyArray,
  explodeCasedPhraseToWords,
  toUpperCamelCase,
  isNotUndefined, isUndefined
} from "../../../Source";
import { suite, test } from "node:test";
import { strictEqual, deepStrictEqual, notDeepStrictEqual } from "assert";


Promise.all(

  Object.values(RawObjectDataProcessor.ProcessingApproaches).map(

    async (processingApproach: RawObjectDataProcessor.ProcessingApproaches): Promise<void> => suite(
      explodeCasedPhraseToWords(toUpperCamelCase(processingApproach)).join(" "),
      async (): Promise<void> => {

        await Promise.all([

          suite(
            explodeCasedPhraseToWords(
              toUpperCamelCase(RawObjectDataProcessor.ObjectSubtypes.fixedSchema)
            ).join(" "),
            async (): Promise<void> => {

              await Promise.all([

                suite(
                  "Null Property is Definitely Allowed or Forbidden",
                  async (): Promise<void> => {

                    const TARGET_PROPERTY_NAME: "alpha" = "alpha";
                    type ValidData = { [TARGET_PROPERTY_NAME]: number; };

                    const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                      nameForLogging: "ValidData",
                      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                      properties: {
                        [TARGET_PROPERTY_NAME]: {
                          type: Number,
                          numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
                          isNullForbidden: true,
                          isUndefinedForbidden: true
                        }
                      }
                    };

                    await Promise.all([

                      suite(
                        "Valid Data",
                        async (): Promise<void> => {

                          function generateConstantValidDataSample(): ValidData {
                            return { alpha: 7 };
                          }

                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                              RawObjectDataProcessor.process(
                                generateConstantValidDataSample(), validDataSpecification, { processingApproach }
                              );

                          const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                          let processedData: ValidData | undefined;
                          let validationErrorsMessages: ReadonlyArray<string> | undefined;

                          if ("processedData" in processingResult) {
                            processedData = processingResult.processedData;
                          } else {
                            validationErrorsMessages = processingResult.validationErrorsMessages;
                          }

                          await Promise.all([

                            test(
                              "Input Data is Valid as Expected",
                              (): void => {
                                strictEqual(isRawDataInvalid, false);
                              }
                            ),

                            test(
                              "No Validation Errors Messages as Expected",
                              (): void => {
                                strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
                              }
                            ),

                            test(
                              "Output Data is Even With Input Data as Expected",
                              (): void => {
                                deepStrictEqual(processedData, generateConstantValidDataSample());
                              }
                            )

                          ]);

                        }
                      ),

                      suite(
                        "Invalid Data",
                        async (): Promise<void> => {

                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                              RawObjectDataProcessor.process(
                                { alpha: null }, validDataSpecification, { processingApproach }
                              );

                          const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                          const validationErrorsMessages: ReadonlyArray<string> = processingResult.rawDataIsInvalid ?
                              processingResult.validationErrorsMessages : [];

                          await Promise.all([

                            test(
                              "Input Data is Invalid as Expected",
                              (): void => {
                                strictEqual(isRawDataInvalid, true);
                              }
                            ),

                            test(
                              "Has Exactly One Validation Error Message as Expected",
                              (): void => {
                                strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
                              }
                            ),

                            test(
                              "Validation Error Message is Correct",
                              (): void => {
                                strictEqual(
                                  undefinedToEmptyArray(validationErrorsMessages)[0],
                                  RawObjectDataProcessor.generateValidationErrorMessage({
                                    ...RawObjectDataProcessor.defaultLocalization.validationErrors.forbiddenNullValue,
                                    targetPropertyDotSeparatedQualifiedInitialName: TARGET_PROPERTY_NAME,
                                    targetPropertyNewName: null,
                                    targetPropertyValue: null,
                                    targetPropertyValueSpecification: validDataSpecification.
                                        properties[TARGET_PROPERTY_NAME]
                                  })
                                );
                              }
                            )

                          ]);

                        }
                      )

                    ]);

                  }
                ),

                suite(
                  "Null Value is Conditionally Forbidden",
                  async (): Promise<void> => {

                    const TARGET_PROPERTY_NAME: "swimmingPoolMaximalDepth__meters" = "swimmingPoolMaximalDepth__meters";
                    type ValidData = { hasSwimmingPool: boolean; [TARGET_PROPERTY_NAME]?: number; };
                    const requirementConditionDescription: string = "`hasSwimmingPool` is true";

                    const validDataSpecification: RawObjectDataProcessor.FixedSchemaObjectTypeDataSpecification = {
                      nameForLogging: "ValidData",
                      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                      properties: {
                        hasSwimmingPool: {
                          type: Boolean,
                          isUndefinedForbidden: true,
                          isNullForbidden: true
                        },
                        [TARGET_PROPERTY_NAME]: {
                          type: Number,
                          numbersSet: RawObjectDataProcessor.NumbersSets.positiveRealNumber,
                          nullForbiddenIf: {
                            predicate: (rawData: ArbitraryObject): boolean => rawData.hasSwimmingPool === true,
                            descriptionForLogging: requirementConditionDescription
                          },
                          isUndefinedForbidden: true
                        }
                      }
                    };

                    await suite(
                      "Valid Data",
                      async (): Promise<void> => {

                        function generateConstantValidDataSample(): ValidData {
                          return { hasSwimmingPool: true, swimmingPoolMaximalDepth__meters: 3 };
                        }

                        const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                            RawObjectDataProcessor.process(
                              generateConstantValidDataSample(), validDataSpecification, { processingApproach }
                            );

                        const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                        let processedData: ValidData | undefined;
                        let validationErrorsMessages: ReadonlyArray<string> | undefined;

                        if ("processedData" in processingResult) {
                          processedData = processingResult.processedData;
                        } else {
                          validationErrorsMessages = processingResult.validationErrorsMessages;
                        }

                        await Promise.all([

                          test(
                            "Input Data is Valid as Expected",
                            (): void => {
                              strictEqual(isRawDataInvalid, false);
                            }
                          ),

                          test(
                            "No Validation Errors Messages as Expected",
                            (): void => {
                              strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
                            }
                          ),

                          test(
                            "Output Data is Even with Input Data as Expected",
                            (): void => {
                              deepStrictEqual(processedData, generateConstantValidDataSample());
                            }
                          )

                        ]);

                      }
                    );

                    await suite(
                      "Invalid Data",
                      async (): Promise<void> => {

                        const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                            RawObjectDataProcessor.process(
                              { hasSwimmingPool: true, [TARGET_PROPERTY_NAME]: null },
                              validDataSpecification,
                              { processingApproach }
                            );

                        const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                        const validationErrorsMessages: ReadonlyArray<string> = processingResult.rawDataIsInvalid ?
                            processingResult.validationErrorsMessages : [];

                        await Promise.all([

                          test(
                            "Input Data is Invalid as Expected",
                            (): void => {
                              strictEqual(isRawDataInvalid, true);
                            }
                          ),

                          test(
                            "Has Exactly one Validation Error Message as Expected",
                            (): void => {
                              strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
                            }
                          ),

                          test(
                            "Validation Error Message is Correct",
                            (): void => {
                              strictEqual(
                                undefinedToEmptyArray(validationErrorsMessages)[0],
                                RawObjectDataProcessor.generateValidationErrorMessage({
                                  title: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                      conditionallyForbiddenNullValue.title,
                                  description: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                      conditionallyForbiddenNullValue.generateDescription({
                                        verbalConditionWhenNullIsForbidden: requirementConditionDescription
                                      }),
                                  targetPropertyDotSeparatedQualifiedInitialName: TARGET_PROPERTY_NAME,
                                  targetPropertyNewName: null,
                                  targetPropertyValue: null,
                                  targetPropertyValueSpecification: validDataSpecification.properties[TARGET_PROPERTY_NAME]
                                })
                              );
                            }
                          )

                        ]);

                      }
                    );

                  }
                ),

                suite(
                  "Null Value Substitution",
                  async (): Promise<void> => {

                    type ValidData = { foo: string; };

                    function generateConstantDataSample(): { foo: string | null; } {
                      return { foo: null };
                    }

                    const TARGET_PROPERTY_DEFAULT_VALUE: string = "ALPHA";

                    const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                      nameForLogging: "Sample",
                      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                      properties: {
                        foo: {
                          type: String,
                          nullValueSubstitution: TARGET_PROPERTY_DEFAULT_VALUE,
                          isUndefinedForbidden: true
                        }
                      }
                    };

                    const inputData: { foo: string | null; } = generateConstantDataSample();

                    const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                        process(inputData, validDataSpecification, { processingApproach });

                    const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                    let processedData: ValidData | undefined;

                    if ("processedData" in processingResult) {
                      processedData = processingResult.processedData;
                    }

                    await Promise.all([

                      test(
                        "Default Value has Been Substituted as Expected",
                        (): void => {
                          strictEqual(processedData?.foo, TARGET_PROPERTY_DEFAULT_VALUE);
                        }
                      ),

                      test(
                        "Input Data is Valid as Expected",
                        (): void => {
                          strictEqual(isRawDataInvalid, false);
                        }
                      ),

                      test(
                        "Output Data is not Even with Input Data as Expected",
                        (): void => {
                          notDeepStrictEqual(processedData, generateConstantDataSample());
                        }
                      ),

                      ...processingApproach ===
                          RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
                          [
                            test(
                              "Input data has been Changed",
                              (): void => {
                                notDeepStrictEqual(inputData, generateConstantDataSample());
                              }
                            )
                          ] :
                          [
                            test(
                              "Input data has not been Changed",
                              (): void => {
                                deepStrictEqual(inputData, generateConstantDataSample());
                              }
                            )
                          ]

                    ]);

                  }
                ),

                suite(
                  "Transformation of Null to Undefined",
                  async (): Promise<void> => {

                    const TARGET_PROPERTY_NAME: "foo" = "foo";
                    type ValidInputData = { [TARGET_PROPERTY_NAME]: string | null; };
                    type ValidProcessedData = { [TARGET_PROPERTY_NAME]?: string; };

                    function generateConstantDataSample(): ValidInputData {
                      return { [TARGET_PROPERTY_NAME]: null };
                    }

                    const inputData: ValidInputData = generateConstantDataSample();

                    const processingResult: RawObjectDataProcessor.ProcessingResult<ValidProcessedData> =
                        RawObjectDataProcessor.process(
                          inputData,
                          {
                            nameForLogging: "Sample",
                            subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                            properties: {
                              [TARGET_PROPERTY_NAME]: {
                                type: String,
                                mustTransformNullToUndefined: true,
                                isUndefinedForbidden: false
                              }
                            }
                          },
                          { processingApproach }
                        );

                    const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                    let processedData: ValidProcessedData | undefined;

                    if ("processedData" in processingResult) {
                      processedData = processingResult.processedData;
                    }


                    await Promise.all([

                      test(
                        "Initially Null Value is Undefined Now",
                        (): void => {
                          strictEqual(
                            isNotUndefined(processedData) && isUndefined(processedData[TARGET_PROPERTY_NAME]),
                            true
                          );
                        }
                      ),

                      test(
                        "Input Data is Valid as Expected",
                        (): void => {
                          strictEqual(isRawDataInvalid, false);
                        }
                      ),

                      test(
                        "Output Data is not Even With Input Data as Expected",
                        (): void => {
                          notDeepStrictEqual(processedData, generateConstantDataSample());
                        }
                      ),

                      ...processingApproach ===
                          RawObjectDataProcessor.ProcessingApproaches.manipulationsWithSourceObject ?
                          [
                            test(
                              "Input Data has been Changed",
                              (): void => {
                                notDeepStrictEqual(inputData, generateConstantDataSample());
                              }
                            )
                          ] :
                          [
                            test(
                              "Input Data has not been Changed",
                              (): void => {
                                deepStrictEqual(inputData, generateConstantDataSample());
                              }
                            )
                          ]

                    ]);

                  }
                ),

                suite(
                  "Conditionally Required Absence of Property",
                  async (): Promise<void> => {

                    const TARGET_PROPERTY_NAME: "swimmingPoolMaximalDepth__meters" = "swimmingPoolMaximalDepth__meters";
                    type ValidData = { hasSwimmingPool: boolean; [TARGET_PROPERTY_NAME]: number | null; };
                    const requirementConditionDescription: string = "`hasSwimmingPool` is true";
                    const absenceConditionDescription: string = "`hasSwimmingPool` is false";

                    const validDataSpecification: RawObjectDataProcessor.FixedSchemaObjectTypeDataSpecification = {
                      nameForLogging: "ValidData",
                      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                      properties: {
                        hasSwimmingPool: {
                          type: Boolean,
                          isUndefinedForbidden: true,
                          isNullForbidden: true
                        },
                        [TARGET_PROPERTY_NAME]: {
                          type: Number,
                          numbersSet: RawObjectDataProcessor.NumbersSets.positiveRealNumber,
                          isUndefinedForbidden: true,
                          nullForbiddenIf: {
                            predicate: (rawData: ArbitraryObject): boolean => rawData.hasSwimmingPool === true,
                            descriptionForLogging: requirementConditionDescription
                          },
                          mustBeNullIf: {
                            predicate: (rawData: ArbitraryObject): boolean => rawData.hasSwimmingPool === false,
                            descriptionForLogging: absenceConditionDescription
                          }
                        }
                      }
                    };

                    await Promise.all([

                      suite(
                        "Valid Data",
                        async (): Promise<void> => {

                          function generateConstantValidDataSample(): ValidData {
                            return { hasSwimmingPool: false, swimmingPoolMaximalDepth__meters: null };
                          }

                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                              RawObjectDataProcessor.process(
                                generateConstantValidDataSample(), validDataSpecification, { processingApproach }
                              );

                          const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                          let processedData: ValidData | undefined;
                          let validationErrorsMessages: ReadonlyArray<string> | undefined;

                          if ("processedData" in processingResult) {
                            processedData = processingResult.processedData;
                          } else {
                            validationErrorsMessages = processingResult.validationErrorsMessages;
                          }

                          await Promise.all([

                            test(
                              "Input Data is Valid as Expected",
                              (): void => {
                                strictEqual(isRawDataInvalid, false);
                              }
                            ),

                            test(
                              "No Validation Errors Messages as Expected",
                              (): void => {
                                strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 0);
                              }
                            ),

                            test(
                              "Output Data is Even with Input Data as Expected",
                              (): void => {
                                deepStrictEqual(processedData, generateConstantValidDataSample());
                              }
                            )

                          ]);

                        }
                      ),

                      suite(
                        "Invalid Data",
                        async (): Promise<void> => {

                          const TARGET_PROPERTY_VALUE: number = 3;

                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                              RawObjectDataProcessor.process(
                                {
                                  hasSwimmingPool: false,
                                  [TARGET_PROPERTY_NAME]: TARGET_PROPERTY_VALUE
                                },
                                validDataSpecification,
                                { processingApproach }
                              );

                          const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                          const validationErrorsMessages: ReadonlyArray<string> = processingResult.rawDataIsInvalid ?
                              processingResult.validationErrorsMessages : [];

                          await Promise.all([

                            test(
                              "Input Data is Invalid as Expected",
                              (): void => {
                                strictEqual(isRawDataInvalid, true);
                              }
                            ),

                            test(
                              "Has Exactly one Validation Error Message as Expected",
                              (): void => {
                                strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
                              }
                            ),

                            test(
                              "Validation Error Message is Correct",
                              (): void => {
                                strictEqual(
                                  undefinedToEmptyArray(validationErrorsMessages)[0],
                                  RawObjectDataProcessor.generateValidationErrorMessage({
                                    title: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                        conditionallyForbiddenNonNullValue.title,
                                    description: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                        conditionallyForbiddenNonNullValue.generateDescription({
                                          conditionWhenMustBeNull: absenceConditionDescription
                                        }),
                                    targetPropertyDotSeparatedQualifiedInitialName: TARGET_PROPERTY_NAME,
                                    targetPropertyNewName: null,
                                    targetPropertyValue: TARGET_PROPERTY_VALUE,
                                    targetPropertyValueSpecification: validDataSpecification.properties[TARGET_PROPERTY_NAME]
                                  })
                                );
                              }
                            )

                          ]);

                        }
                      )

                    ]);

                  }
                )

              ]);

            }
          )

        ]);

      }
    )

  )

).catch(Logger.logPromiseError);
