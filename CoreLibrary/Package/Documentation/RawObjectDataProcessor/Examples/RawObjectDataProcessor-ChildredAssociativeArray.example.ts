import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError
} from "../../../Source";


type ValidData = {
  foo: { [key: string]: string; };
};

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues,
      required: true,
      value: {
        type: String,
        minimalCharactersCount: 1
      }
    }
  }
};

const dataSample: unknown = {
  foo: {
    bar: "beekeeper",
    baz: "hoge"
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
