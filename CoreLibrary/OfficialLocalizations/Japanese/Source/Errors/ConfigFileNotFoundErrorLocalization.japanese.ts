import type { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const ConfigFileNotFoundErrorLocalization__Japanese: ConfigFileNotFoundError.Localization = {
  defaultTitle: "設定ファイル未発見",
  generateDescription(namedParameters: ConfigFileNotFoundError.Localization.DescriptionTemplateNamedParameters): string {

    let messageCommonPart: string;

    if (Array.isArray(namedParameters.configFilePathOrMultipleOfThem)) {
      messageCommonPart = `「${ namedParameters.targetTechnologyName }」、\n` +
          `${ namedParameters.configFilePathOrMultipleOfThem.join(", \n") }\nの、どちらの設定ファイルも発見出来なかった。`;
    } else {
      messageCommonPart = `「${ namedParameters.targetTechnologyName }」の設定ファイル` +
          `「${ namedParameters.configFilePathOrMultipleOfThem }」が発見出来なかった。`;
    }


    return `${ messageCommonPart }` +
        `${ insertSubstring(namedParameters.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
        }) }`;
  }
};


export default ConfigFileNotFoundErrorLocalization__Japanese;
