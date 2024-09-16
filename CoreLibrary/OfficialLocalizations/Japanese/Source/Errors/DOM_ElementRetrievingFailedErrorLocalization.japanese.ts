import type { DOM_ElementRetrievingFailedError } from "@yamato-daiwa/es-extensions";


export const DOM_ElementRetrievingFailedErrorLocalization__japanese: DOM_ElementRetrievingFailedError.Localization = {
  defaultTitle: "DOM要素未発見",
  generateDescription: (
    { selector }: DOM_ElementRetrievingFailedError.Localization.DescriptionTemplateVariables
  ): string =>
      `セレクター「${ selector }」の要素が発見出来なかった。`
};
