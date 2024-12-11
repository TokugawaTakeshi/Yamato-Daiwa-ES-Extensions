import {
  RawObjectDataProcessor,
  Logger,
  explodeCasedPhraseToWords,
  toUpperCamelCase
} from "../../../Source";
import { suite, test } from "node:test";
import { deepStrictEqual, strictEqual } from "assert";


Promise.all(

  Object.values(RawObjectDataProcessor.ProcessingApproaches).map(

    async (processingApproach: RawObjectDataProcessor.ProcessingApproaches): Promise<void> => suite(
      explodeCasedPhraseToWords(toUpperCamelCase(processingApproach)).join(" "),
      async (): Promise<void> => {

        type ValidData = Readonly<[ "off" | "warn" | "error", { allowSingleLine: boolean; } ]>;

        await Promise.all([

          suite(
            "Simplest case",
            async (): Promise<void> => {

              function generateConstantValidDataSample(): ValidData {
                return [ "warn", { allowSingleLine: true } ];
              }

              const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
                nameForLogging: "ValidData",
                subtype: RawObjectDataProcessor.ObjectSubtypes.tuple,
                elements: {
                  0: {
                    type: String,
                    allowedAlternatives: [ "off", "warn", "error" ]
                  },
                  1: {
                    type: Object,
                    properties: {
                      allowSingleLine: {
                        type: Boolean,
                        isUndefinedForbidden: false,
                        isNullForbidden: false
                      }
                    }
                  }
                }
              };

              const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
                  process(
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
                    strictEqual((validationErrorsMessages ?? []).length, 0);
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
          )

        ]);

      }
    )
  )

).catch(Logger.logPromiseError);
