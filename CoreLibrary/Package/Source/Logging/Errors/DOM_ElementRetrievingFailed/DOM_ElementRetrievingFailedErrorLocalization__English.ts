import DOM_ElementRetrievingFailedError from "./DOM_ElementRetrievingFailedError";


const DOM_ElementRetrievingFailedErrorLocalization__English: DOM_ElementRetrievingFailedError.Localization = {
  defaultTitle: "DOM Element not found",
  genericDescriptionPartTemplate: (
    parameters: DOM_ElementRetrievingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `The DOM element with selector: ${parameters.selector} not found.`
};


export default DOM_ElementRetrievingFailedErrorLocalization__English;
