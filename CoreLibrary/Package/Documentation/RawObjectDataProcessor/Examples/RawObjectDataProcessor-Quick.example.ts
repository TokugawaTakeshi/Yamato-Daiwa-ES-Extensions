import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError
} from "../../../Source";


type ValidData = {
  foo: number;
  bar: string;
  baz: boolean;
  quux: {
    alpha: number;
    bravo: "PLATINUM" | "GOLD" | "SILVER";
  };
};

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: Number,
      required: true,
      numbersSet: RawObjectDataProcessor.NumbersSets.nonNegativeInteger
    },
    bar: {
      type: String,
      required: true,
      minimalCharactersCount: 5
    },
    baz: {
      type: Boolean,
      required: true
    },
    quux: {
      type: Object,
      required: true,
      properties: {
        alpha: {
          type: Number,
          required: true,
          numbersSet: RawObjectDataProcessor.NumbersSets.anyInteger,
          minimalValue: 3
        },
        bravo: {
          type: String,
          required: true,
          minimalCharactersCount: 5,
          allowedAlternatives: [ "PLATINUM", "GOLD", "SILVER" ]
        }
      }
    }
  }
};

const dataSample1: unknown = {
  foo: 5,
  bar: "beekeeper",
  baz: true,
  quux: {
    alpha: 5,
    bravo: "PLATINUM"
  }
};

const dataSample2: unknown = {
  foo: -4,
  bar: "abc",
  quux: {
    alpha: 2,
    bravo: "BRONZE"
  }
};


const dataSample1ProcessingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
    process(dataSample1, validDataSpecification);

if (dataSample1ProcessingResult.rawDataIsInvalid) {
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


const dataSample2ProcessingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
    process(dataSample2, validDataSpecification);

if (dataSample2ProcessingResult.rawDataIsInvalid) {
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
