import type { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";


const ConfigFileNotFoundErrorLocalization__Japanese: ConfigFileNotFoundError.Localization = {
  defaultTitle: "設定ファイルが発見されず",
  generateDescription(namedParameters: ConfigFileNotFoundError.Localization.DescriptionTemplateNamedParameters): string {
    
    if (Array.isArray(namedParameters.configFilePathOrMultipleOfThem)) {
      return `「${ namedParameters.targetTechnologyName }」の設定ファイル：\n` +
          `${ namedParameters.configFilePathOrMultipleOfThem.join(", \n") }\nの中からどちらも発見されず。`;
    }


    return `「${ namedParameters.targetTechnologyName }」の設定ファイル「${ namedParameters.configFilePathOrMultipleOfThem }」が発見されず。`;
  }
};


export default ConfigFileNotFoundErrorLocalization__Japanese;
