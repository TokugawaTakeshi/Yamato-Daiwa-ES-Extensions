import type { InvalidConsoleCommandError } from "@yamato-daiwa/es-extensions-nodejs";


const invalidConsoleCommandErrorLocalization__russian: InvalidConsoleCommandError.Localization = {
  defaultTitle: "Невалидная консольная команда",
  generateDescriptionCommonPart:
      ({ applicationName }: InvalidConsoleCommandError.Localization.CommonDescription.TemplateVariables): string =>
          `Команда приложения "${ applicationName }" невалидна. `
};


export default invalidConsoleCommandErrorLocalization__russian;
