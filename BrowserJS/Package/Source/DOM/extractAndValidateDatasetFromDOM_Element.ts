import {
  Logger,
  InvalidParameterValueError,
  InvalidExternalDataError,
  RawObjectDataProcessor,
  type ReadonlyParsedJSON
} from "@yamato-daiwa/es-extensions";


export default function extractAndValidateDatasetFromDOM_Element<ExtractedDataset extends ReadonlyParsedJSON>(
  {
    targetDOM_Element,
    targetDOM_ElementNameOrSelectorForLogging,
    validDataSpecification,
    mustDeleteMentionedDataAttributesOnceExtracted = false
  }: Readonly<{
    targetDOM_Element: Element;
    targetDOM_ElementNameOrSelectorForLogging: string;
    validDataSpecification: RawObjectDataProcessor.PropertiesSpecification;
    mustDeleteMentionedDataAttributesOnceExtracted?: boolean;
  }>
): ExtractedDataset {

  if (!(targetDOM_Element instanceof HTMLElement)) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidParameterValueError({
        parameterNumber: 1,
        parameterName: "compoundParameter.targetDOM_Element",
        messageSpecificPart: "To extract the dataset, the target DOM element must be an instance of HTMLElement or its inheritor."
      }),
      title: InvalidParameterValueError.localization.defaultTitle,
      occurrenceLocation: "extractAndValidateDatasetFromDOM_Element(compoundParameter)"
    });
  }


  const datasetProcessingResult: RawObjectDataProcessor.ProcessingResult<ExtractedDataset> = RawObjectDataProcessor.process(
    targetDOM_Element.dataset,
    {
      nameForLogging: targetDOM_ElementNameOrSelectorForLogging,
      subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
      properties: validDataSpecification
    }
  );

  if (datasetProcessingResult.rawDataIsInvalid) {
    Logger.throwErrorAndLog({
      errorInstance: new InvalidExternalDataError({
        mentionToExpectedData: targetDOM_ElementNameOrSelectorForLogging,
        messageSpecificPart: RawObjectDataProcessor.formatValidationErrorsList(datasetProcessingResult.validationErrorsMessages)
      }),
      title: InvalidExternalDataError.localization.defaultTitle,
      occurrenceLocation: "extractAndValidateDatasetFromDOM_Element(compoundParameter)"
    });
  }


  if (mustDeleteMentionedDataAttributesOnceExtracted) {
    for (const datasetItemKey of Object.keys(validDataSpecification)) {

      /* eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- S
      * Such method of data attribute removing is recommended and works in all modern browsers.
      * https://stackoverflow.com/a/9201264/4818123 */
      delete targetDOM_Element.dataset[datasetItemKey];

    }
  }

  return datasetProcessingResult.processedData;

}
