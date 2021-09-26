import { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";


const ConfigFileNotFoundErrorLocalization__Russian: ConfigFileNotFoundError.Localization = {
  defaultTitle: "Файл конфигурации не найден",
  genericDescriptionPartTemplate(
    parametersObject: ConfigFileNotFoundError.Localization.GenericDescriptionPartTemplateParameters
  ): string {
    if (Array.isArray(parametersObject.configFilePathOrMultipleOfThem)) {
      return `Ни один из нижеследующих конфигурационных файлов ${parametersObject.targetTechnologyName} не найден.` +
          `${parametersObject.configFilePathOrMultipleOfThem.join(", ")}`;
    }
    return `Конфигурационный файл ${parametersObject.configFilePathOrMultipleOfThem} для ` +
        `${parametersObject.targetTechnologyName} не найден.`;
  }
};


export default ConfigFileNotFoundErrorLocalization__Russian;
