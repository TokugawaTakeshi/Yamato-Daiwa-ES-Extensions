import { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";


const ConfigFileNotFoundErrorLocalization__Japanese: ConfigFileNotFoundError.Localization = {
  defaultTitle: "設定ファイルが発見されず",
  genericDescriptionPartTemplate(
    parametersObject: ConfigFileNotFoundError.Localization.GenericDescriptionPartTemplateParameters
  ): string {
    if (Array.isArray(parametersObject.configFilePathOrMultipleOfThem)) {
      return `${parametersObject.targetTechnologyName}の設定ファイル：` +
          `${parametersObject.configFilePathOrMultipleOfThem.join(", ")}、何方も発見されず。`;
    }
    return `${parametersObject.targetTechnologyName}の設定ファイル：${parametersObject.configFilePathOrMultipleOfThem}が発見されず。`;
  }
};


export default ConfigFileNotFoundErrorLocalization__Japanese;
