import { InvalidParameterValueError, insertSubstring } from "@yamato-daiwa/es-extensions";


const InvalidParameterValueErrorLocalization__Russian: InvalidParameterValueError.Localization = {
  defaultTitle: "Невалидное значение аргумента",
  genericDescriptionPartTemplate:
    (parametersObject: InvalidParameterValueError.Localization.GenericDescriptionPartTemplateParameters): string =>
        `Значение параметра ${parametersObject.parameterName} невалидно.` +
        `${insertSubstring(parametersObject.messageSpecificPart, {
          modifier: (messageSpecificPart: string): string => `\n${messageSpecificPart}`
        })}`
};


export default InvalidParameterValueErrorLocalization__Russian;
