import {
  RawObjectDataProcessor,
  Logger,
  type ArbitraryObject,
  undefinedToEmptyArray,
  toUpperCamelCase,
  explodeCasedPhraseToWords,
  isNotUndefined
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
                  "Undefined Property is Definitely Allowed or Forbidden",
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
                          isUndefinedForbidden: true,
                          isNullForbidden: true
                        }
                      }
                    };

                    await Promise.all([

                      suite(
                        "Valid Data",
                        async (): Promise<void> => {

                          function generateConstantValidDataSample(): ValidData {
                            return { [TARGET_PROPERTY_NAME]: 7 };
                          }

                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                              RawObjectDataProcessor.process(
                                generateConstantValidDataSample(), validDataSpecification, { processingApproach }
                              );

                          const isRawDataInvalid: boolean = processingResult.isRawDataInvalid;
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

                          const suitesTitlesAndRespectiveSourceObjects: Map<string, ArbitraryObject> = new Map([
                            [ "Target Property Absence", {} ],
                            [ "Explicit Undefined Value of Target Property", { [TARGET_PROPERTY_NAME]: undefined } ]
                          ]);

                          await Promise.all(
                            suitesTitlesAndRespectiveSourceObjects.
                                entries().
                                map(
                                  async ([ suiteTitle, sourceData ]: Readonly<[ string, ArbitraryObject ]>): Promise<void> =>
                                      suite(
                                        suiteTitle,
                                        async (): Promise<void> => {

                                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                                            RawObjectDataProcessor.process(
                                              sourceData, validDataSpecification, { processingApproach }
                                            );

                                          const isRawDataInvalid: boolean = processingResult.isRawDataInvalid;
                                          const validationErrorsMessages: ReadonlyArray<string> =
                                              processingResult.isRawDataInvalid ?
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
                                                    ...RawObjectDataProcessor.defaultLocalization.validationErrors.
                                                        forbiddenUndefinedValue,
                                                    targetPropertyDotSeparatedQualifiedInitialName: TARGET_PROPERTY_NAME,
                                                    targetPropertyNewName: null,
                                                    /* eslint-disable-next-line no-undefined --
                                                     * It could be omitted, but the explicit `undefined` is better for readability
                                                     *   of the tests for this case. */
                                                    targetPropertyValue: undefined,
                                                    targetPropertyValueSpecification:
                                                        validDataSpecification.properties[TARGET_PROPERTY_NAME]
                                                  })
                                                );
                                              }
                                            )

                                          ]);

                                        }
                                      )
                                )
                          );

                        }
                      )

                    ]);

                  }
                ),

                suite(
                  "Undefined Value is Conditionally Forbidden",
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
                          undefinedForbiddenIf: {
                            predicate: (
                              { rawData__currentObjectDepth: rawData }:
                                  RawObjectDataProcessor.ConditionAssociatedWithProperty.Predicate.Parameter
                            ): boolean => rawData.hasSwimmingPool === true,
                            descriptionForLogging: requirementConditionDescription
                          },
                          isNullForbidden: true
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

                        const isRawDataInvalid: boolean = processingResult.isRawDataInvalid;
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
                              { hasSwimmingPool: true }, validDataSpecification, { processingApproach }
                            );

                        const isRawDataInvalid: boolean = processingResult.isRawDataInvalid;
                        const validationErrorsMessages: ReadonlyArray<string> = processingResult.isRawDataInvalid ?
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
                                      conditionallyForbiddenUndefinedValue.title,
                                  description: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                      conditionallyForbiddenUndefinedValue.generateDescription({
                                        verbalConditionWhenUndefinedIsForbiddenWithoutEndOfSentenceMark: requirementConditionDescription
                                      }),
                                  targetPropertyDotSeparatedQualifiedInitialName: TARGET_PROPERTY_NAME,
                                  targetPropertyNewName: null,
                                  /* eslint-disable-next-line no-undefined --
                                   * It could be omitted, but the explicit `undefined` is better for readability
                                   *   of the tests for this case. */
                                  targetPropertyValue: undefined,
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
                  "Undefined Value Substitution",
                  async (): Promise<void> => {

                    type ValidData = { foo: string; };

                    function generateConstantDataSample(): Partial<ValidData> {
                      return {};
                    }

                    const TARGET_PROPERTY_DEFAULT_VALUE: string = "ALPHA";

                    const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                      nameForLogging: "Sample",
                      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                      properties: {
                        foo: {
                          type: String,
                          undefinedValueSubstitution: TARGET_PROPERTY_DEFAULT_VALUE,
                          isNullForbidden: true
                        }
                      }
                    };

                    const inputData: Partial<ValidData> = generateConstantDataSample();

                    const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                        process(inputData, validDataSpecification, { processingApproach });

                    const isRawDataInvalid: boolean = processingResult.isRawDataInvalid;
                    let processedData: ValidData | undefined;

                    if ("processedData" in processingResult) {
                      processedData = processingResult.processedData;
                    }

                    await Promise.all([

                      test(
                        "Default Value has been Substituted as Expected",
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
                        "Output Data is not Even With Input Data as Expected",
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
                  "Transformation of Undefined to Null",
                  async (): Promise<void> => {

                    const TARGET_PROPERTY_NAME: "foo" = "foo";
                    type ValidInputData = { [TARGET_PROPERTY_NAME]?: string; };
                    type ValidProcessedData = { [TARGET_PROPERTY_NAME]: string | null; };

                    function generateConstantDataSample(): ValidInputData {
                      return {};
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
                                mustTransformUndefinedToNull: true,
                                isNullForbidden: false
                              }
                            }
                          },
                          { processingApproach }
                        );

                    const isRawDataInvalid: boolean = processingResult.isRawDataInvalid;
                    let processedData: ValidProcessedData | undefined;

                    if ("processedData" in processingResult) {
                      processedData = processingResult.processedData;
                    }


                    await Promise.all([

                      test(
                        "Initially Undefined Value is Null Now",
                        (): void => {
                          strictEqual(
                            isNotUndefined(processedData) && processedData[TARGET_PROPERTY_NAME] === null,
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
                    type ValidData = { hasSwimmingPool: boolean; [TARGET_PROPERTY_NAME]?: number; };
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
                          undefinedForbiddenIf: {
                            predicate: (
                              {
                                rawData__currentObjectDepth: rawData
                              }: RawObjectDataProcessor.ConditionAssociatedWithProperty.Predicate.Parameter
                            ): boolean =>
                                  rawData.hasSwimmingPool === true,
                            descriptionForLogging: requirementConditionDescription
                          },
                          mustBeUndefinedIf: {
                            predicate: (
                              {
                                rawData__currentObjectDepth: rawData
                              }: RawObjectDataProcessor.ConditionAssociatedWithProperty.Predicate.Parameter
                            ): boolean =>
                                  rawData.hasSwimmingPool === false,
                            descriptionForLogging: absenceConditionDescription
                          },
                          isNullForbidden: true
                        }
                      }
                    };

                    await Promise.all([

                      suite(
                        "Valid Data",
                        async (): Promise<void> => {

                          function generateConstantValidDataSample(): ValidData {
                            return { hasSwimmingPool: false };
                          }

                          const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                              RawObjectDataProcessor.process(
                                generateConstantValidDataSample(), validDataSpecification, { processingApproach }
                              );

                          const isRawDataInvalid: boolean = processingResult.isRawDataInvalid;
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

                          const isRawDataInvalid: boolean = processingResult.isRawDataInvalid;
                          const validationErrorsMessages: ReadonlyArray<string> = processingResult.isRawDataInvalid ?
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
                                        conditionallyForbiddenNonUndefinedValue.title,
                                    description: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                        conditionallyForbiddenNonUndefinedValue.generateDescription({
                                          conditionWhenMustBeUndefined: absenceConditionDescription
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
          ),

          suite(
            explodeCasedPhraseToWords(
              toUpperCamelCase(RawObjectDataProcessor.ObjectSubtypes.associativeArray)
            ).join(" "),
            async (): Promise<void> => {

              await Promise.all([

              ]);

            }
          ),

          suite(
            explodeCasedPhraseToWords(
              toUpperCamelCase(RawObjectDataProcessor.ObjectSubtypes.indexedArray)
            ).join(" "),
            async (): Promise<void> => {

              await Promise.all([

              ]);

            }
          ),

          suite(
            explodeCasedPhraseToWords(
              toUpperCamelCase(RawObjectDataProcessor.ObjectSubtypes.tuple)
            ).join(" "),
            async (): Promise<void> => {

              await Promise.all([

              ]);

            }
          )

        ]);

      }
    )

  )

).catch(Logger.logPromiseError);
