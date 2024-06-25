import type DataSubmittingFailedError from "./DataSubmittingFailedError";


const dataSubmittingFailedErrorLocalization__english: DataSubmittingFailedError.Localization = {
  defaultTitle: "Data submitting failure",
  generateDescription: (
    { mentionToData }: DataSubmittingFailedError.Localization.DescriptionTemplateVariables
  ): string => `The error occurred during submitting of the data "${ mentionToData }".`
};


export default dataSubmittingFailedErrorLocalization__english;
