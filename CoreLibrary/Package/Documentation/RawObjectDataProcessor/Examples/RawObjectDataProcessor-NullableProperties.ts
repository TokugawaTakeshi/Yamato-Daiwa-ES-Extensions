import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError,
  nullToUndefined
} from "../../../Source";


const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: String,
      required: false
    },
    bar: {
      type: String,
      required: false,
      nullable: true
    },
    baz: {
      type: String,
      required: true,
      nullSubstitution: "ALPHA"
    },
    hoge: {
      type: String,
      required: false,
      preValidationModifications(rawValue: unknown): unknown { return nullToUndefined(rawValue); }
    }
  }
};


type ValidData = {
  foo?: string;
  bar?: string | null;
  baz: string;
  hoge?: string;
};

const sample: unknown = {
  foo: null,
  bar: null,
  baz: null,
  hoge: null
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
