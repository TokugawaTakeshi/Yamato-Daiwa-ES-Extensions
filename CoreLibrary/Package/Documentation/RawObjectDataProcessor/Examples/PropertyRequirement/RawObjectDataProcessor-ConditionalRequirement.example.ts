import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError,
  type ArbitraryObject
} from "../../../../Source";


type ValidData = {
  hasSwimmingPool: boolean;
  swimmingPoolMaximalDepth__meters?: number;
};

const sample: unknown = { hasSwimmingPool: true };

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    hasSwimmingPool: {
      type: Boolean,
      required: false
    },
    swimmingPoolMaximalDepth__meters: {
      type: Number,
      numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber,
      requiredIf: {
        predicate(rawData: ArbitraryObject): boolean {
          return rawData.hasSwimmingPool === true;
        },
        descriptionForLogging: "'hasSwimmingPool' is true"
      }
    }
  }
};

const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
    RawObjectDataProcessor.process(sample, validDataSpecification);

if (processingResult.rawDataIsInvalid) {
  Logger.logError({
    errorType: InvalidExternalDataError.NAME,
    title: InvalidExternalDataError.localization.defaultTitle,
    description: "The 'sample' is invalid.\n" +
        RawObjectDataProcessor.formatValidationErrorsList(processingResult.validationErrorsMessages),
    occurrenceLocation: "Top-level scope"
  });
}
