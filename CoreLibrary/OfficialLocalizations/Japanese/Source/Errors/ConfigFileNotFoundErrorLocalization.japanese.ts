import type { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";


const ConfigFileNotFoundErrorLocalization__Japanese: ConfigFileNotFoundError.Localization = {
  defaultTitle: "設定ファイル未発見",
  generateDescription(namedParameters: ConfigFileNotFoundError.Localization.DescriptionTemplateNamedParameters): string {

    if (Array.isArray(namedParameters.configFilePathOrMultipleOfThem)) {
      return `「${ namedParameters.targetTechnologyName }」、\n` +
          `${ namedParameters.configFilePathOrMultipleOfThem.join(", \n") }\nの、どちらの設定ファイルも発見出来なかった。`;
    }


    return `「${ namedParameters.targetTechnologyName }」の設定ファイル「${ namedParameters.configFilePathOrMultipleOfThem }」が発見出来なかった。`;
  }
};


export default ConfigFileNotFoundErrorLocalization__Japanese;
