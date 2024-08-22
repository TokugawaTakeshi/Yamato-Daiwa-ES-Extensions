import {
  RawObjectDataProcessor,
  Logger,
  InvalidExternalDataError
} from "../../../Source";


type User = {
  ID: string;
  familyName: string;
  givenName: string;
};

const rawData: unknown = { ID: 1, familyName: "John", title: "Shampoo" };

/* It just casts the raw data to `User` when it obeys the specified validation rules, but this validation rules could
*    have a mistake or simply be unrelated with `User`. */
const processingResult: RawObjectDataProcessor.ProcessingResult<User> = RawObjectDataProcessor.process(rawData, {
  nameForLogging: "User",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    ID: {
      required: true,
      type: String
    },
    familyName: {
      required: true,
      type: String
    },
    givenName: {
      required: true,
      type: String
    }
  }
});


if (processingResult.rawDataIsInvalid) {
  Logger.logError({
    errorType: InvalidExternalDataError.NAME,
    title: InvalidExternalDataError.localization.defaultTitle,
    description: "The raw data is invalid:" +
        RawObjectDataProcessor.formatValidationErrorsList(processingResult.validationErrorsMessages),
    occurrenceLocation: "upper scope"
  });
}
