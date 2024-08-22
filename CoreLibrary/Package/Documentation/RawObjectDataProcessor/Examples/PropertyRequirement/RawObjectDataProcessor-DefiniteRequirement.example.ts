import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError
} from "../../../../Source";


type ValidData = { foo: number; };

const sample: unknown = {};

const dataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
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

const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
    RawObjectDataProcessor.process(sample, dataSpecification);

if (processingResult.rawDataIsInvalid) {
  Logger.logError({
    errorType: InvalidExternalDataError.NAME,
    title: InvalidExternalDataError.localization.defaultTitle,
    description: "The 'sample' is invalid.\n" +
        RawObjectDataProcessor.formatValidationErrorsList(processingResult.validationErrorsMessages),
    occurrenceLocation: "Top-level scope"
  });
}
