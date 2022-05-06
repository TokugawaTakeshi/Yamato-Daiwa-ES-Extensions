import DOM_ElementRetrievingFailedError from "./DOM_ElementRetrievingFailedError";


const DOM_ElementRetrievingFailedErrorLocalization__English: DOM_ElementRetrievingFailedError.Localization = {
  defaultTitle: "DOM Element not found",
  generateDescription: (
    namedParameters: DOM_ElementRetrievingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `The DOM element with selector: ${namedParameters.selector} not found.`
};


export default DOM_ElementRetrievingFailedErrorLocalization__English;
