import type { ConfigFileNotFoundError } from "@yamato-daiwa/es-extensions";
import { isString, isNonEmptyString } from "@yamato-daiwa/es-extensions";


export const configFileNotFoundErrorLocalization__russian: ConfigFileNotFoundError.Localization = {
  defaultTitle: "Файл конфигурации не найден",
  generateDescription: (
    {
      configFilePathOrMultipleOfThem,
      targetTechnologyName,
      messageSpecificPart
    }: ConfigFileNotFoundError.Localization.DescriptionTemplateVariables
  ): string => [

      isString(configFilePathOrMultipleOfThem) ?
          [ `Конфигурационный файл "${ configFilePathOrMultipleOfThem }" для "${ targetTechnologyName }" не найден.` ] :
          [
            `Ни один из нижеследующих конфигурационных файлов для "${ targetTechnologyName }" не найден.\n` +
            configFilePathOrMultipleOfThem.join(", ")
          ],

      isNonEmptyString(messageSpecificPart) ? [ `\n${ messageSpecificPart }` ] : []

    ].join("")
};
