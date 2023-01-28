import type { InvalidConsoleCommandError } from "@yamato-daiwa/es-extensions-nodejs";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidConsoleCommandErrorLocalization__Russian: InvalidConsoleCommandError.Localization = {
  defaultTitle: "Невалидная консольная команда",
  generateDescription:
    (namedParameters: InvalidConsoleCommandError.Localization.DescriptionTemplateNamedParameters): string =>
        `Команда для приложения '${ namedParameters.applicationName }' невалидна.` +
        `${ insertSubstring(namedParameters.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
        }) }`
};


export default InvalidConsoleCommandErrorLocalization__Russian;
