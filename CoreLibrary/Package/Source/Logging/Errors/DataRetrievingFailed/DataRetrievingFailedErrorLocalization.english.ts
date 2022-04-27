import DataRetrievingFailedError from "./DataRetrievingFailedError";


const DataRetrievingFailedErrorLocalization__English: DataRetrievingFailedError.Localization = {
  defaultTitle: "Retrieving of the data from data source failed",
  generateDescription: (
    parametersObject: DataRetrievingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The error occurred during the retrieving of the data '${parametersObject.mentionToData}' from the external ` +
      "data source."
};


export default DataRetrievingFailedErrorLocalization__English;
