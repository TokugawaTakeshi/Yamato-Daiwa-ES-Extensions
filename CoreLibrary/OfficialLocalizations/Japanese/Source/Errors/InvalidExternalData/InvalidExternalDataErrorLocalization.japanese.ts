import type { InvalidExternalDataError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


export const InvalidExternalDataErrorLocalization__Japanese: InvalidExternalDataError.Localization = {
  defaultTitle: "外部から取得されたデータは仕様と合っていない",
  generateDescription:
      (namedParameters: InvalidExternalDataError.Localization.DescriptionTemplateNamedParameters): string =>
          `「${namedParameters.mentionToExpectedData}」は期待された構成と合っていない。` +
          `${ insertSubstring(namedParameters.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
          }) }`
};


export default InvalidExternalDataErrorLocalization__Japanese;
