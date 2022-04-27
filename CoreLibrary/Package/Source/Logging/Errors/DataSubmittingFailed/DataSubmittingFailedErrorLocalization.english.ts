import DataSubmittingFailedError from "./DataSubmittingFailedError";


const DataSubmittingFailedErrorLocalization__English: DataSubmittingFailedError.Localization = {
  defaultTitle: "Data submitting failure",
  generateDescription: (
    parametersObject: DataSubmittingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The error occurred during submitting of the data '${parametersObject.mentionToData}'.`
};


export default DataSubmittingFailedErrorLocalization__English;
