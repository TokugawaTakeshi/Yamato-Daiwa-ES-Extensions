import {
  RawObjectDataProcessor
} from "../../../../Source";


type ValidData = {
  foo: string;
};

const sample: unknown = {};

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedSchema,
  properties: {
    foo: {
      type: String,
      defaultValue: "ALPHA"
    }
  }
};

const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> =
    RawObjectDataProcessor.process(sample, validDataSpecification);

if (processingResult.isRawDataInvalid) {
  // Process the validation errors ...
} else {
  console.log(processingResult.processedData.foo);
}
