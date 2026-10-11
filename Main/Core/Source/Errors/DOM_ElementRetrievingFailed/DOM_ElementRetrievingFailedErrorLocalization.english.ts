import type DOM_ElementRetrievingFailedError from "./DOM_ElementRetrievingFailedError";


const DOM_ElementRetrievingFailedErrorLocalization__english: DOM_ElementRetrievingFailedError.Localization = {
  defaultTitle: "DOM Element not Found",
  generateDescription: (
    { selector }: DOM_ElementRetrievingFailedError.Localization.DescriptionTemplateVariables
  ): string => `The DOM element with selector: ${ selector } not found.`
};


export default DOM_ElementRetrievingFailedErrorLocalization__english;
