import DataRetrievingFailedError from "./DataRetrievingFailedError";


const DataRetrievingFailedErrorLocalization__English: DataRetrievingFailedError.Localization = {
  defaultTitle: "Retrieving of the data from data source failed",
  generateDescription: (
    namedParameters: DataRetrievingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The error occurred during the retrieving of the data '${namedParameters.mentionToData}' from the external ` +
      "data source."
};


export default DataRetrievingFailedErrorLocalization__English;
