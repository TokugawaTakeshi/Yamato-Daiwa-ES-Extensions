import type DataRetrievingFailedError from "./DataRetrievingFailedError";


const dataRetrievingFailedErrorLocalization__english: DataRetrievingFailedError.Localization = {

  defaultTitle: "Retrieving of the data from data source failed",

  generateDescription: (
    { mentionToData, messageSpecificPart }: DataRetrievingFailedError.Localization.DescriptionTemplateVariables
  ): string =>

      [
        `The error occurred during the retrieving of the data "${ mentionToData }" from the external data source.`,
        ...[ messageSpecificPart ]
      ].join("\n")

};


export default dataRetrievingFailedErrorLocalization__english;
