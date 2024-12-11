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
              "Forbidden for specific Keys Undefined or Null Values",
              async (): Promise<void> => {

                type Sample = { [key: string]: string; };

                const keysOfNeitherUndefinedNorNullValues: ReadonlyArray<string> = [ "bravo", "charlie" ];

                const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                  nameForLogging: "Sample",
                  subtype: RawObjectDataProcessor.ObjectSubtypes.associativeArray,
                  keysOfNeitherUndefinedNorNullValues,
                  value: {
                    type: String
                  }
                };

                await Promise.all([

                  suite(
                    "Valid Data",
                    async (): Promise<void> => {

                      function generateConstantValidDataSample(): Sample {
                        return {
                          alpha: "FOO",
                          bravo: "BAR",
                          charlie: "BAZ"
                        };
                      }

                      const processingResult: RawObjectDataProcessor.ProcessingResult<Sample> = RawObjectDataProcessor.process(
                        generateConstantValidDataSample(), validDataSpecification, { processingApproach }
                      );

                      const isRawDataInvalid: boolean = processingResult.rawDataIsInvalid;
                      let processedData: Sample | undefined;
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

                      function generateConstantInvalidDataSample(): Sample {
                        return {
                          delta: "HOGE",
                          echo: "FUGA"
                        };
                      }

                      const processingResult: RawObjectDataProcessor.ProcessingResult<Sample> = RawObjectDataProcessor.process(
                        generateConstantInvalidDataSample(),
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
                          "Has Exactly One Validation Error Message as Expected",
                          (): void => {
                            strictEqual(undefinedToEmptyArray(validationErrorsMessages).length, 1);
                          }
                        ),

                        test(
                          "Validation Error Message is Correct",
                          (): void => {
                            strictEqual(
                              undefinedToEmptyArray(validationErrorsMessages)[0].includes(
                                RawObjectDataProcessor.defaultLocalization.validationErrors.
                                    forbiddenForSpecificKeysUndefinedOrNullValuesFoundInAssociativeArrayTypeObject.
                                    title
                              ),
                              true
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
