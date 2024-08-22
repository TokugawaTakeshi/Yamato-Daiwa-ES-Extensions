import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError
} from "../../../Source";


type ValidData = {
  foo: Array<{ bar: string; baz: boolean; }>;
};

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: Array,
      required: true,
      element: {
        type: Object,
        properties: {
          bar: {
            type: String,
            required: true,
            minimalCharactersCount: 5
          },
          baz: {
            type: Boolean,
            required: true
          }
        }
      }
    }
  }
};

const dataSample: unknown = {
  foo: {
    bar: "beekeeper",
    baz: true
  }
};


const dataSampleProcessingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
    process(dataSample, validDataSpecification);

if (dataSampleProcessingResult.rawDataIsInvalid) {
  Logger.logError({
    errorType: InvalidExternalDataError.NAME,
    title: InvalidExternalDataError.localization.defaultTitle,
    description: "The dataSample is invalid:" +
        RawObjectDataProcessor.formatValidationErrorsList(dataSampleProcessingResult.validationErrorsMessages),
    occurrenceLocation: "upper scope"
  });
}
