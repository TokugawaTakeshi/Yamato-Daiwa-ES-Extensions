import { InvalidExternalDataError, insertSubstring } from "@yamato-daiwa/es-extensions";


export const InvalidExternalDataErrorLocalization__Japanese: InvalidExternalDataError.Localization = {
  defaultTitle: "外部から取得されたデータは仕様と合っていない",
  genericDescriptionPartTemplate:
      (
        parametersObject: InvalidExternalDataError.Localization.
            GenericDescriptionPartTemplateParameters
      ): string => `${parametersObject.mentionToExpectedData}は期待された構成と合っていない。` +
          `${insertSubstring(parametersObject.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
          })}`
};


export default InvalidExternalDataErrorLocalization__Japanese;
