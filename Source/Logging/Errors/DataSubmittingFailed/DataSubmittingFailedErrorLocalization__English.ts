import DataSubmittingFailedError from "./DataSubmittingFailedError";


const DataSubmittingFailedErrorLocalization__English: DataSubmittingFailedError.Localization = {
  defaultTitle: "Data submitting failure",
  genericDescriptionPartTemplate: (
    parametersObject: DataSubmittingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `The error occurred during submitting of the data '${parametersObject.mentionToData}'.`
};


export default DataSubmittingFailedErrorLocalization__English;
