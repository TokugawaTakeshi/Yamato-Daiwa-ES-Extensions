import type DataSubmittingFailedError from "./DataSubmittingFailedError";


const dataSubmittingFailedErrorLocalization__english: DataSubmittingFailedError.Localization = {

  defaultTitle: "Data submitting failure",

  generateDescription: (
    { mentionToData, messageSpecificPart }: DataSubmittingFailedError.Localization.DescriptionTemplateVariables
  ): string =>

      [
        `The error occurred during submitting of the data "${ mentionToData }".`,
        ...[ messageSpecificPart ]
      ].join("\n")

};


export default dataSubmittingFailedErrorLocalization__english;
