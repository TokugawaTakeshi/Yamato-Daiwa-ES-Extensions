import type InvalidConsoleCommandError from "./InvalidConsoleCommandError";


const invalidConsoleCommandErrorLocalization__english: InvalidConsoleCommandError.Localization = {
  defaultTitle: "Invalid Console Command",
  generateDescriptionCommonPart:
      ({ applicationName }: InvalidConsoleCommandError.Localization.CommonDescription.TemplateVariables): string =>
          `Invalid console command for the application "${ applicationName }".`
};


export default invalidConsoleCommandErrorLocalization__english;
