import { DOM_ElementRetrievingFailedError } from "@yamato-daiwa/es-extensions";


const DOM_ElementRetrievingFailedErrorLocalization__Japanese: DOM_ElementRetrievingFailedError.Localization = {
  defaultTitle: "DOM要素が発見されず",
  genericDescriptionPartTemplate: (
    parameters: DOM_ElementRetrievingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `セレクター：「${parameters.selector}」の要素が取得出来なかった。`
};


export default DOM_ElementRetrievingFailedErrorLocalization__Japanese;
