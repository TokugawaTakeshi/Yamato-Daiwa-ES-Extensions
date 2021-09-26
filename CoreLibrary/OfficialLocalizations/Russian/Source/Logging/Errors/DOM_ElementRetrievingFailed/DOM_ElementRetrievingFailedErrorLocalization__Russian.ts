import { DOM_ElementRetrievingFailedError } from "@yamato-daiwa/es-extensions";


const DOM_ElementRetrievingFailedErrorLocalization__Russian: DOM_ElementRetrievingFailedError.Localization = {
  defaultTitle: "DOM элемент не найден",
  genericDescriptionPartTemplate: (
    parameters: DOM_ElementRetrievingFailedError.Localization.GenericDescriptionPartTemplateParameters
  ): string => `Не найден DOM-элемент соответствующий селектору ${parameters.selector}.`
};


export default DOM_ElementRetrievingFailedErrorLocalization__Russian;
