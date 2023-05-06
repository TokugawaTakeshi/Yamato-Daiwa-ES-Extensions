import type { InvalidConsoleCommandError } from "@yamato-daiwa/es-extensions-nodejs";


const invalidConsoleCommandErrorLocalization__japanese: InvalidConsoleCommandError.Localization = {
  defaultTitle: "不正コンソルコマンド",
  generateDescriptionCommonPart:
      ({ applicationName }: InvalidConsoleCommandError.Localization.CommonDescription.TemplateParameters): string =>
          `アプリケーション「${ applicationName }」のコマンドは不備がある。`
};


export default invalidConsoleCommandErrorLocalization__japanese;
