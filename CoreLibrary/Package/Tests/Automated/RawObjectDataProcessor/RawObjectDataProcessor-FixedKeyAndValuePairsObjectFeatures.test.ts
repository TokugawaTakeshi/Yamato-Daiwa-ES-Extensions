import {
  RawObjectDataProcessor,
  Logger,
  explodeCasedPhraseToWords,
  toUpperCamelCase, undefinedToEmptyArray
} from "../../../Source";
import { suite, test } from "node:test";
import { deepStrictEqual, strictEqual } from "assert";


Promise.all(

  Object.values(RawObjectDataProcessor.ProcessingApproaches).map(

    async (processingApproach: RawObjectDataProcessor.ProcessingApproaches): Promise<void> => suite(
      explodeCasedPhraseToWords(toUpperCamelCase(processingApproach)).join(" "),
        async (): Promise<void> => {

          await Promise.all([

            suite(
              "Minimal Options",
              async (): Promise<void> => {

                type ValidData = {
                  alpha1: {
                    alpha2: number;
                    bravo2: string;
                  };
                };

                function generateConstantValidDataSample(): ValidData {
                  return {
                    alpha1: {
                      alpha2: 7,
                      bravo2: "foo"
                    }
                  };
                }

                const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.process(
                  generateConstantValidDataSample(),
                  {
                    nameForLogging: "ValidData",
                    subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                    properties: {
                      alpha1: {
                        isUndefinedForbidden: true,
                        isNullForbidden: true,
                        type: Object,
                        properties: {
                          alpha2: {
                            isUndefinedForbidden: true,
                            isNullForbidden: true,
                            type: Number,
                            numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber
                          },
                          bravo2: {
                            isUndefinedForbidden: true,
                            isNullForbidden: true,
                            type: String
                          }
                        }
                      }
                    }
                  },
                  { processingApproach }
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
              "Expecting of only specified properties",
              async (): Promise<void> => {

                type ValidData = {
                  alpha: string;
                  bravo: string;
                  charlie: string;
                };

                const validObjectSpecification: RawObjectDataProcessor.FixedSchemaObjectTypeDataSpecification = {
                  nameForLogging: "Data",
                  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
                  mustExpectOnlySpecifiedProperties: true,
                  properties: {
                    alpha: {
                      type: String,
                      isUndefinedForbidden: true,
                      isNullForbidden: true
                    },
                    bravo: {
                      type: String,
                      isUndefinedForbidden: true,
                      isNullForbidden: true
                    },
                    charlie: {
                      type: String,
                      isUndefinedForbidden: true,
                      isNullForbidden: true
                    }
                  }
                };

                await Promise.all([

                  test(
                    "Valid Value",
                    async (): Promise<void> => {

                      function generateConstantValidDataSample(): ValidData {
                        return {
                          alpha: "FOO",
                          bravo: "BAR",
                          charlie: "BAR"
                        };
                      }

                      const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.process(
                        generateConstantValidDataSample(),
                        validObjectSpecification,
                        { processingApproach }
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

                  test(
                    "Invalid Value",
                    async (): Promise<void> => {

                      function generateConstantInvalidDataSample(): ValidData & { delta: string; echo: string; } {
                        return {
                          alpha: "FOO",
                          bravo: "BAR",
                          charlie: "BAR",
                          delta: "HOGE",
                          echo: "FUGA"
                        };
                      }

                      const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.process(
                        generateConstantInvalidDataSample(),
                        validObjectSpecification,
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
                                title: RawObjectDataProcessor.defaultLocalization.validationErrors.unexpectedProperties.title,
                                description: RawObjectDataProcessor.defaultLocalization.validationErrors.unexpectedProperties.
                                    generateDescription({ unexpectedProperties: [ "delta", "echo" ] }),
                                targetPropertyDotSeparatedQualifiedInitialName: null,
                                targetPropertyNewName: null,
                                targetPropertyValue: generateConstantInvalidDataSample(),
                                targetPropertyValueSpecification: {
                                  type: RawObjectDataProcessor.ValuesTypesIDs.fixedSchemaObject,
                                  ...validObjectSpecification
                                }
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
  )

).catch(Logger.logPromiseError);
