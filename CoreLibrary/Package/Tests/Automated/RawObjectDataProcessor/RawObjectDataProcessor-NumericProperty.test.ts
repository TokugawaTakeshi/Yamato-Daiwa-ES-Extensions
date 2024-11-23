import {
  RawObjectDataProcessor,
  undefinedToEmptyArray,
  explodeCasedPhraseToWords,
  toUpperCamelCase,
  Logger
} from "../../../Source";
import { suite, test } from "node:test";
import { deepEqual, strictEqual } from "assert";


suite(
  "Numeric Property",
  async (): Promise<void> => {

    await Promise.all(

      Object.values(RawObjectDataProcessor.ProcessingApproaches).map(

        async (processingApproach: RawObjectDataProcessor.ProcessingApproaches): Promise<void> =>

            suite(
              explodeCasedPhraseToWords(toUpperCamelCase(processingApproach)).join(" "),
              async (): Promise<void> => {

                await Promise.all([

                  suite(
                    "Type Check",
                    async (): Promise<void> => {

                      const TARGET_PROPERTY_NAME: "alpha" = "alpha";
                      type ValidData = { [TARGET_PROPERTY_NAME]: number; };

                      const targetValueSpecification: RawObjectDataProcessor.NumericPropertySpecification = {
                        type: Number,
                        numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
                        required: true
                      };

                      const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                        nameForLogging: "ValidData",
                        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
                        properties: {
                          [TARGET_PROPERTY_NAME]: targetValueSpecification
                        }
                      };

                      await Promise.all([

                        suite(
                          "Valid Data",
                          async (): Promise<void> => {

                            function generateConstantValidDataSample(): ValidData {
                              return { [TARGET_PROPERTY_NAME]: 6 };
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
                                  deepEqual(processedData, generateConstantValidDataSample());
                                }
                              )

                            ]);

                          }
                        ),

                        suite(
                          "Invalid Data",
                          async (): Promise<void> => {

                            const TARGET_PROPERTY_INVALID_VALUE: string = "NOT_A_NUMBER";

                            function generateConstantValidDataSample(): unknown {
                              return { [TARGET_PROPERTY_NAME]: TARGET_PROPERTY_INVALID_VALUE };
                            }

                            const sourceData: unknown = generateConstantValidDataSample();

                            const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                                process(sourceData, validDataSpecification, { processingApproach });

                            const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                            let validationErrorsMessages: ReadonlyArray<string> | undefined;

                            if ("validationErrorsMessages" in processingResult) {
                              validationErrorsMessages = processingResult.validationErrorsMessages;
                            }

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
                                      title: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                          valueTypeDoesNotMatchWithExpected.title,
                                      description: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                          valueTypeDoesNotMatchWithExpected.generateDescription({
                                            actualType: "string",
                                            expectedType: RawObjectDataProcessor.ValuesTypesIDs.number
                                          }),
                                      targetPropertyDotSeparatedQualifiedInitialName: TARGET_PROPERTY_NAME,
                                      targetPropertyNewName: null,
                                      targetPropertyValue: TARGET_PROPERTY_INVALID_VALUE,
                                      targetPropertyValueSpecification: validDataSpecification.properties[TARGET_PROPERTY_NAME]
                                    })
                                  );
                                }
                              ),

                              test(
                                "Source Data Has not Changed as Expected",
                                (): void => {
                                  deepEqual(sourceData, generateConstantValidDataSample());
                                }
                              )

                            ]);

                          }
                        )

                      ]);

                    }
                  ),

                  suite(
                    "Numbers Set Check",
                    async (): Promise<void> => {

                      const TARGET_PROPERTY_NAME: "alpha" = "alpha";

                      type ValidData = { [TARGET_PROPERTY_NAME]: number; };

                      function generateValidDataSpecification(
                        targetNumberSet: RawObjectDataProcessor.NumbersSets
                      ): RawObjectDataProcessor.FixedKeyAndValuesTypeObjectDataSpecification {
                        return {
                          nameForLogging: "ValidData",
                          subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
                          properties: {
                            [TARGET_PROPERTY_NAME]: {
                              type: Number,
                              numbersSet: targetNumberSet,
                              required: true
                            }
                          }
                        };
                      }


                      await Promise.all(
                        Array.from(
                          new Map<
                            RawObjectDataProcessor.NumbersSets,
                            Readonly<{
                              sampleValidValues: ReadonlyArray<number>;
                              sampleInvalidValues: ReadonlyArray<number>;
                            }>
                          >([
                            [
                              RawObjectDataProcessor.NumbersSets.naturalNumber,
                              {
                                sampleValidValues: [ 1 ],
                                sampleInvalidValues: [ 0, -1, 0.1, -0.1 ]
                              }
                            ],
                            [
                              RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero,
                              {
                                sampleValidValues: [ 0, 1 ],
                                sampleInvalidValues: [ -1, 0.1, -0.1 ]
                              }
                            ]
                          ]).entries()
                        ).map(
                          async (
                            [ numberSet, { sampleValidValues, sampleInvalidValues } ]: [
                              RawObjectDataProcessor.NumbersSets,
                              Readonly<{
                                sampleValidValues: ReadonlyArray<number>;
                                sampleInvalidValues: ReadonlyArray<number>;
                              }>
                            /* eslint-disable-next-line @stylistic/array-bracket-newline --
                             * Looks like this rule is not adapted for tuples.  */
                            ]
                          ): Promise<void> =>
                              suite(
                                explodeCasedPhraseToWords(toUpperCamelCase(numberSet)).join(" "),
                                async (): Promise<void> => {

                                  const validDataSpecification:
                                      RawObjectDataProcessor.FixedKeyAndValuesTypeObjectDataSpecification =
                                          generateValidDataSpecification(numberSet);

                                  await Promise.all([

                                    suite(
                                      "Valid Data",
                                      async (): Promise<void> => {

                                        await Promise.all(
                                          sampleValidValues.map(
                                            async (validValue: number): Promise<void> =>
                                                suite(
                                                  `For Sample Valid Value ${ validValue }`,
                                                  async (): Promise<void> => {

                                                    function generateConstantValidDataSample(): ValidData {
                                                      return { [TARGET_PROPERTY_NAME]: validValue };
                                                    }

                                                    const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                                                        RawObjectDataProcessor.process(
                                                          generateConstantValidDataSample(),
                                                          validDataSpecification,
                                                          { processingApproach }
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
                                                          deepEqual(processedData, generateConstantValidDataSample());
                                                        }
                                                      )

                                                    ]);

                                                  }
                                                )
                                          )
                                        );

                                      }
                                    ),

                                    suite(
                                      "Invalid Data",
                                      async (): Promise<void> => {

                                        await Promise.all(
                                          sampleInvalidValues.map(
                                            async (invalidValue: number): Promise<void> =>
                                                suite(
                                                  `For Sample Invalid Value ${ invalidValue }`,
                                                  async (): Promise<void> => {

                                                    function generateConstantInvalidDataSample(): ValidData {
                                                      return { [TARGET_PROPERTY_NAME]: invalidValue };
                                                    }

                                                    const sourceData: unknown = generateConstantInvalidDataSample();

                                                    const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
                                                        RawObjectDataProcessor.process(
                                                          generateConstantInvalidDataSample(),
                                                          validDataSpecification,
                                                          { processingApproach }
                                                        );

                                                    const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                                                    let validationErrorsMessages: ReadonlyArray<string> | undefined;

                                                    if ("validationErrorsMessages" in processingResult) {
                                                      validationErrorsMessages = processingResult.validationErrorsMessages;
                                                    }

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
                                                              title: RawObjectDataProcessor.defaultLocalization.validationErrors.
                                                                  numericValueIsNotBelongToExpectedNumbersSet.title,
                                                              description: RawObjectDataProcessor.defaultLocalization.
                                                                  validationErrors.
                                                                  numericValueIsNotBelongToExpectedNumbersSet.
                                                                  generateDescription({ expectedNumberSet: numberSet }),
                                                              targetPropertyDotSeparatedQualifiedInitialName:
                                                                  TARGET_PROPERTY_NAME,
                                                              targetPropertyNewName: null,
                                                              targetPropertyValue: invalidValue,
                                                              targetPropertyValueSpecification: validDataSpecification.
                                                                  properties[TARGET_PROPERTY_NAME]
                                                            })
                                                          );
                                                        }
                                                      ),

                                                      test(
                                                        "Source Data Has not Changed as Expected",
                                                        (): void => {
                                                          deepEqual(sourceData, generateConstantInvalidDataSample());
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

                              )
                        )

                      );

                    }
                  )

                ]);

              }
            )

      )

    );

  }
).catch(Logger.logPromiseError);
