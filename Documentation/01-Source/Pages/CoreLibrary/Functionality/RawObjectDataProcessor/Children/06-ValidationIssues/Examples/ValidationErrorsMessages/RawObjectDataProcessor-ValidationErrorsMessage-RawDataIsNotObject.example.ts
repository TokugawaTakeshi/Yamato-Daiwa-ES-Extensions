import { RawObjectDataProcessor } from "@yamato-daiwa/es-extensions";


type SampleType = { alpha: string; };

const dataProcessingResult: RawObjectDataProcessor.ProcessingResult<SampleType> = RawObjectDataProcessor.

    process(
      "NON_OBJECT",
      {
        nameForLogging: "Example",
        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
        properties: {
          foo: {
            type: String,
            isUndefinedForbidden: true,
            isNullForbidden: true
          }
        }
      }
    );

if (dataProcessingResult.isRawDataInvalid) {
  console.error(RawObjectDataProcessor.formatValidationErrorsList(dataProcessingResult.validationErrorsMessages));
}
