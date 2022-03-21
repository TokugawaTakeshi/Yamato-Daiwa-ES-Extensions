import InvalidConsoleCommandError from "./InvalidConsoleCommandError";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidConsoleCommandErrorLocalization__English: InvalidConsoleCommandError.Localization = {
  defaultTitle: "Invalid console command",
  genericDescriptionPartTemplate:
    (parametersObject: InvalidConsoleCommandError.Localization.GenericDescriptionPartTemplateParameters): string =>
        `Invalid console command for the application '${parametersObject.applicationName}'` +
        `${insertSubstring(parametersObject.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
        })}`

};


export default InvalidConsoleCommandErrorLocalization__English;
