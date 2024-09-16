import type { InvalidExternalDataError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const invalidExternalDataErrorLocalization__japanese: InvalidExternalDataError.Localization = {
  defaultTitle: "外部取得データの仕様不整合",
  generateDescription:
      (
        {
          messageSpecificPart,
          mentionToExpectedData
        }: InvalidExternalDataError.Localization.DescriptionTemplateVariables
      ): string =>
          `「${ mentionToExpectedData }」は、仕様上期待される構成になっていない。` +
          insertSubstring(
            messageSpecificPart,
            { modifier: (specifiedMessageSpecificPart: string): string => `\n${ specifiedMessageSpecificPart }` }
          )
};
