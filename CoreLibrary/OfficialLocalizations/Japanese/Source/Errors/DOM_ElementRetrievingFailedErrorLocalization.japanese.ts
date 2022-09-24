import type { DOM_ElementRetrievingFailedError } from "@yamato-daiwa/es-extensions";


const DOM_ElementRetrievingFailedErrorLocalization__Japanese: DOM_ElementRetrievingFailedError.Localization = {
  defaultTitle: "DOM要素が発見されず",
  generateDescription: (
    namedParameters: DOM_ElementRetrievingFailedError.Localization.DescriptionTemplateNamedParameters
  ): string => `セレクター「${ namedParameters.selector }」の要素が見つからなかった。`
};


export default DOM_ElementRetrievingFailedErrorLocalization__Japanese;
