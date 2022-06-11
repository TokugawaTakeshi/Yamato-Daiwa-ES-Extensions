import type { InvalidConsoleCommandError } from "@yamato-daiwa/es-extensions-nodejs";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidConsoleCommandErrorLocalization__Japanese: InvalidConsoleCommandError.Localization = {
  defaultTitle: "不正コンソルコマンド",
  generateDescription:
    (namedParameters: InvalidConsoleCommandError.Localization.DescriptionTemplateNamedParameters): string =>
        `アプリケーション「${ namedParameters.applicationName }」のコマンドは不備がある。` +
        `${ insertSubstring(namedParameters.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
        }) }`
};


export default InvalidConsoleCommandErrorLocalization__Japanese;
