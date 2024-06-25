import type { DOM_ElementRetrievingFailedError } from "@yamato-daiwa/es-extensions";


export const DOM_ElementRetrievingFailedErrorLocalization__russian: DOM_ElementRetrievingFailedError.Localization = {
  defaultTitle: "DOM элемент не найден",
  generateDescription: (
    { selector }: DOM_ElementRetrievingFailedError.Localization.DescriptionTemplateVariables
  ): string =>
      `Не найден DOM-элемент соответствующий селектору "${ selector }".`
};
