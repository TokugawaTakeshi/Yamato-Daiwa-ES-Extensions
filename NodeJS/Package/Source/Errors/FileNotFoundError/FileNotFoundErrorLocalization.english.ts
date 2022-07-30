import type FileNotFoundError from "./FileNotFoundError";
import { insertSubstring } from "@yamato-daiwa/es-extensions";


const FileNotFoundErrorLocalization__English: FileNotFoundError.Localization = {
  defaultTitle: "File not found error",
  genericDescription:
      (parametersObject: FileNotFoundError.Localization.DescriptionTemplateNamedParameters): string =>
          `File with path '${ parametersObject.filePath }' not found.` +
          `${ insertSubstring(parametersObject.messageSpecificPart, {
            modifier: (messageSpecificPart: string): string => `\n${ messageSpecificPart }`
          }) }`
};


export default FileNotFoundErrorLocalization__English;
