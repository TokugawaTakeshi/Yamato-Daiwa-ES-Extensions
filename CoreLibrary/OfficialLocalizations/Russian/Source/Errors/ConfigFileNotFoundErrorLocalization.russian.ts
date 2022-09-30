import type { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const ConfigFileNotFoundErrorLocalization__Russian: ConfigFileNotFoundError.Localization = {
  defaultTitle: "Файл конфигурации не найден",
  generateDescription(namedParameters: ConfigFileNotFoundError.Localization.DescriptionTemplateNamedParameters): string {

    let messageCommonPart: string;

    if (Array.isArray(namedParameters.configFilePathOrMultipleOfThem)) {
      messageCommonPart = `Ни один из нижеследующих конфигурационных файлов для '${ namedParameters.targetTechnologyName }' ` +
          `не найден.\n${ namedParameters.configFilePathOrMultipleOfThem.join(", ") }`;
    } else {
      messageCommonPart = `Конфигурационный файл '${ namedParameters.configFilePathOrMultipleOfThem }' для ` +
          `'${ namedParameters.targetTechnologyName }' не найден.`;
    }


    return `${ messageCommonPart }` +
        `${ insertSubstring(namedParameters.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
        }) }`;
  }
};


export default ConfigFileNotFoundErrorLocalization__Russian;
