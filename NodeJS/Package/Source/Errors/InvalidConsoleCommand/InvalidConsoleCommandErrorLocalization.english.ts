import type InvalidConsoleCommandError from "./InvalidConsoleCommandError";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidConsoleCommandErrorLocalization__English: InvalidConsoleCommandError.Localization = {
  defaultTitle: "Invalid console command",
  generateDescription:
    (namedParameters: InvalidConsoleCommandError.Localization.DescriptionTemplateNamedParameters): string =>
        `Invalid console command for the application '${ namedParameters.applicationName }'.` +
        `${ insertSubstring(namedParameters.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
        }) }`
};


export default InvalidConsoleCommandErrorLocalization__English;
