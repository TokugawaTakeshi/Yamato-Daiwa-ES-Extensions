import type { InvalidExternalDataError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const InvalidExternalDataErrorLocalization__Japanese: InvalidExternalDataError.Localization = {
  defaultTitle: "外部取得データの仕様不整合",
  generateDescription:
      (namedParameters: InvalidExternalDataError.Localization.DescriptionTemplateNamedParameters): string =>
          `「${ namedParameters.mentionToExpectedData }」は、仕様上期待される構成になっていない。` +
          `${ insertSubstring(namedParameters.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
          }) }`
};


export default InvalidExternalDataErrorLocalization__Japanese;
