import type { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";


const ConfigFileNotFoundErrorLocalization__Russian: ConfigFileNotFoundError.Localization = {
  defaultTitle: "Файл конфигурации не найден",
  generateDescription(namedParameters: ConfigFileNotFoundError.Localization.DescriptionTemplateNamedParameters): string {
    
    if (Array.isArray(namedParameters.configFilePathOrMultipleOfThem)) {
      return `Ни один из нижеследующих конфигурационных файлов для '${ namedParameters.targetTechnologyName }' не найден.\n` +
          `${ namedParameters.configFilePathOrMultipleOfThem.join(", ") }`;
    }


    return `Конфигурационный файл '${ namedParameters.configFilePathOrMultipleOfThem }' для ` +
        `'${ namedParameters.targetTechnologyName }' не найден.`;
  }
};


export default ConfigFileNotFoundErrorLocalization__Russian;
