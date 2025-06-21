import {
  InvalidExternalDataError,
  RawObjectDataProcessor
} from "@yamato-daiwa/es-extensions";


type SampleType = {
  foo: number;
  bar: string;
  baz: boolean;
  hoge?: number;
  fuga: string | null;
  quux: {
    alpha: number;
    bravo: "PLATINUM" | "GOLD" | "SILVER";
  };
};

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
  properties: {
    foo: {
      type: Number,
      isUndefinedForbidden: true,
      isNullForbidden: true,
      numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero
    },
    bar: {
      type: String,
      isUndefinedForbidden: true,
      isNullForbidden: true,
      minimalCharactersCount: 5
    },
    baz: {
      type: Boolean,
      isUndefinedForbidden: true,
      isNullForbidden: true
    },
    hoge: {
      type: Number,
      isUndefinedForbidden: false,
      isNullForbidden: true,
      numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero
    },
    fuga: {
      type: Number,
      isUndefinedForbidden: true,
      isNullForbidden: false,
      numbersSet: RawObjectDataProcessor.NumbersSets.positiveIntegerOrZero
    },
    quux: {
      type: Object,
      isUndefinedForbidden: true,
      isNullForbidden: true,
      properties: {
        alpha: {
          type: Number,
          isUndefinedForbidden: true,
          isNullForbidden: true,
          numbersSet: RawObjectDataProcessor.NumbersSets.anyInteger,
          minimalValue: 3
        },
        bravo: {
          type: String,
          isUndefinedForbidden: true,
          isNullForbidden: true,
          minimalCharactersCount: 5,
          allowedAlternatives: [ "PLATINUM", "GOLD", "SILVER" ]
        }
      }
    }
  }
};

function onDataRetrieved(externalData: unknown): void {

  const externalDataProcessingResult: RawObjectDataProcessor.ProcessingResult<SampleType> = RawObjectDataProcessor.
      process(externalData, validDataSpecification);

  if (externalDataProcessingResult.isRawDataInvalid) {

    throw new InvalidExternalDataError({
      mentionToExpectedData: "N External Data",
      messageSpecificPart: RawObjectDataProcessor.
          formatValidationErrorsList(externalDataProcessingResult.validationErrorsMessages)
    });

  }


}


onDataRetrieved({
  foo: -4,
  bar: "abc",
  quux: {
    alpha: 2,
    bravo: "BRONZE"
  }
});


/* [ On Demand ]

  const dataSample1: unknown = {
    foo: 5,
    bar: "beekeeper",
    baz: true,
    quux: {
      alpha: 5,
      bravo: "PLATINUM"
    }
  }

  if (dataSample1ProcessingResult.isRawDataInvalid) {
    Logger.logError({
      errorType: InvalidExternalDataError.NAME,
      title: InvalidExternalDataError.localization.defaultTitle,
      description: "The dataSample1 is invalid:" +
          RawObjectDataProcessor.formatValidationErrorsList(dataSample1ProcessingResult.validationErrorsMessages),
      occurrenceLocation: "upper scope"
    });
  } else {
    Logger.logSuccess({
      title: "Processing done",
      description: "The dataSample1 is valid."
    });
  }


  const dataSample2ProcessingResult: RawObjectDataProcessor.ProcessingResult<SampleType> = RawObjectDataProcessor.
      process(dataSample2, validDataSpecification);

  if (dataSample2ProcessingResult.isRawDataInvalid) {
    Logger.logError({
      errorType: InvalidExternalDataError.NAME,
      title: InvalidExternalDataError.localization.defaultTitle,
      description: "The dataSample2 is invalid:" +
          RawObjectDataProcessor.formatValidationErrorsList(dataSample2ProcessingResult.validationErrorsMessages),
      occurrenceLocation: "upper scope"
    });
  } else {
    Logger.logSuccess({
      title: "Processing done",
      description: "The dataSample2 is valid."
    });
  }

 */
