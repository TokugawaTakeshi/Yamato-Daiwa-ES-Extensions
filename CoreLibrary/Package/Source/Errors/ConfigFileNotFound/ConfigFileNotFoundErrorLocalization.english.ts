import type ConfigFileNotFoundError from "./ConfigFileNotFoundError";
import isString from "../../TypeGuards/Strings/isString";
import insertSubstring from "../../Strings/insertSubstring";


const configFileNotFoundErrorLocalization__english: ConfigFileNotFoundError.Localization = {

  defaultTitle: "Configuration file not found",

  generateDescription(
    {
      messageSpecificPart,
      targetTechnologyName,
      configFilePathOrMultipleOfThem
    }: ConfigFileNotFoundError.Localization.DescriptionTemplateVariables
  ): string {
    return `${
      isString(configFilePathOrMultipleOfThem) ?
          `The "${ targetTechnologyName }" configuration file not found at "${ configFilePathOrMultipleOfThem }".` :
          `None of below "${ targetTechnologyName }" configuration files found.\n${ configFilePathOrMultipleOfThem.join(", ") }`
    }` +
        `${ 
          insertSubstring(
            messageSpecificPart, 
            { modifier: (_messageSpecificPart: string): string => `\n${ _messageSpecificPart }` }
          ) 
        }`;
  }
};


export default configFileNotFoundErrorLocalization__english;
