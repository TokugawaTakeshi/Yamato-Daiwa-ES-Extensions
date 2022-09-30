import type DataSubmittingFailedError from "./DataSubmittingFailedError";


const DataSubmittingFailedErrorLocalization__English: DataSubmittingFailedError.Localization = {
  defaultTitle: "Data submitting failure",
  generateDescription: (
    namedParameters: DataSubmittingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The error occurred during submitting of the data '${ namedParameters.mentionToData }'.`
};


export default DataSubmittingFailedErrorLocalization__English;
